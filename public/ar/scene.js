import { LocalStorageRepository, discoverFromMarker } from './domain.js';
const ids=['africa','america','antartida','asia','europa','oceania'];
const params=new URLSearchParams(location.search), id=params.get('continente'), modelPath=params.get('model');
const embedded=window.parent!==window,origin=location.origin,repo=new LocalStorageRepository();
const status=document.querySelector('#status');
let scene,marker,model,stableTimer,foundAt=0,stopped=false,scale=1,rotation=0,tilt=0;
const streams=new Set();
const post=(type,payload)=>{if(embedded)window.parent.postMessage({app:'exploradores-ar',version:1,type,payload},origin);};
function error(type,code,text){status.textContent=text;post(type,{code});}
// AR.js 3.4.7 não preserva sempre o erro nativo em CustomEvent.detail.
// A interceptação mantém o código de permissão e fecha streams que chegam após sair.
if(navigator.mediaDevices?.getUserMedia){
 const nativeGetUserMedia=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
 navigator.mediaDevices.getUserMedia=async constraints=>{
  try{const stream=await nativeGetUserMedia(constraints);if(stopped){stream.getTracks().forEach(t=>t.stop());throw new DOMException('Cena encerrada','AbortError');}streams.add(stream);return stream;}
  catch(e){if(!stopped)error(e.name==='NotAllowedError'?'ar:camera-denied':'ar:camera-error',e.name,e.name==='NotAllowedError'?'Câmera bloqueada. Autorize nas permissões do site.':'Não foi possível acessar a câmera.');throw e;}
 };
}
function transform(){if(model){model.setAttribute('scale',`${scale} ${scale} ${scale}`);model.setAttribute('rotation',`${tilt} ${rotation} 0`);}}
function action(type,payload={}){
 if(type==='ar:stop'){stop();return;}
 if(type==='ar:reset'){scale=1;rotation=0;tilt=0;}
 else if(type==='ar:set-scale'){if(typeof payload.scale!=='number'||!Number.isFinite(payload.scale))return;scale=Math.max(.5,Math.min(3,payload.scale));}
 else if(type==='ar:rotate'){if(typeof payload.degrees!=='number'||!Number.isFinite(payload.degrees))return;rotation+=Math.max(-180,Math.min(180,payload.degrees));}
 else return;
 transform();
}
window.addEventListener('message',e=>{const m=e.data;if(!embedded||e.origin!==origin||e.source!==window.parent||!m||m.app!=='exploradores-ar'||m.version!==1||typeof m.type!=='string')return;if(m.payload!==undefined&&(!m.payload||typeof m.payload!=='object'||Array.isArray(m.payload)))return;action(m.type,m.payload);});
async function stableFound(){
 if(stopped||document.hidden||!marker?.object3D?.visible)return;
 const stableMs=performance.now()-foundAt;if(stableMs<500)return;
 const payload={continentId:id,stableMs};
 if(embedded)post('ar:marker-found',payload);else await discoverFromMarker(repo,id,payload);
 status.textContent='Continente descoberto! O modelo acompanha a folha.';
}
function stop(){
 if(stopped){post('ar:stopped');return;}stopped=true;clearTimeout(stableTimer);
 scene?.pause();
 streams.forEach(s=>s.getTracks().forEach(t=>t.stop()));streams.clear();
 const ar=scene?.systems?.arjs?._arSession;
 const source=ar?.arSource?.domElement;
 if(source?.srcObject)source.srcObject.getTracks().forEach(t=>t.stop());
 document.querySelectorAll('video').forEach(v=>{v.srcObject?.getTracks().forEach(t=>t.stop());v.pause();v.srcObject=null;v.remove();});
 scene?.object3D?.traverse(o=>{o.geometry?.dispose();const materials=Array.isArray(o.material)?o.material:[o.material];materials.filter(Boolean).forEach(m=>{Object.values(m).forEach(v=>{if(v?.isTexture)v.dispose();});m.dispose();});});
 ar?.arContext?.arController?.dispose?.();
 scene?.renderer?.setAnimationLoop(null);scene?.renderer?.dispose();scene?.renderer?.forceContextLoss();scene?.remove();
 document.querySelectorAll('canvas').forEach(c=>c.remove());
 post('ar:stopped');
}
window.addEventListener('pagehide',stop);
document.addEventListener('visibilitychange',()=>{clearTimeout(stableTimer);if(document.hidden){scene?.pause();}else if(!stopped){scene?.play();if(marker?.object3D?.visible){foundAt=performance.now();stableTimer=setTimeout(stableFound,510);}}});
function start(){
 if(!ids.includes(id)||modelPath!==`models/${id}.glb`){error('ar:model-error','invalid','Continente ou modelo inválido.');return;}
 const canvas=document.createElement('canvas');
 if(!isSecureContext||!navigator.mediaDevices?.getUserMedia||!(canvas.getContext('webgl2')||canvas.getContext('webgl'))){error('ar:camera-error','unsupported','É necessário HTTPS, câmera e WebGL para usar a RA.');return;}
 if(!window.AFRAME||!AFRAME.systems.arjs){error('ar:camera-error','unsupported','As bibliotecas de RA não carregaram.');return;}
 scene=document.createElement('a-scene');scene.setAttribute('embedded','');scene.setAttribute('vr-mode-ui','enabled: false');scene.setAttribute('renderer','antialias: true; alpha: true; precision: mediump; colorManagement: true;');
 scene.setAttribute('arjs','sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; cameraParametersUrl: ../vendor/camera_para.dat; patternRatio: 0.5; maxDetectionRate: 30;');
 marker=document.createElement('a-marker');marker.setAttribute('type','barcode');marker.setAttribute('value',String(ids.indexOf(id)));marker.setAttribute('emitevents','true');marker.setAttribute('smooth','false');
 model=document.createElement('a-entity');model.setAttribute('gltf-model',`../${modelPath}`);model.setAttribute('scale','1 1 1');marker.append(model);scene.append(marker);
 const ambient=document.createElement('a-entity');ambient.setAttribute('light','type: ambient; intensity: 1');scene.append(ambient);
 const light=document.createElement('a-entity');light.setAttribute('light','type: directional; intensity: 1.5');light.setAttribute('position','1 3 2');scene.append(light);
 const camera=document.createElement('a-entity');camera.setAttribute('camera','');scene.append(camera);
 marker.addEventListener('markerFound',()=>{if(stopped)return;clearTimeout(stableTimer);foundAt=performance.now();status.textContent='Marcador encontrado. Mantenha a folha visível…';stableTimer=setTimeout(stableFound,510);});
 marker.addEventListener('markerLost',()=>{clearTimeout(stableTimer);foundAt=0;post('ar:marker-lost',{continentId:id});status.textContent='Reposicione a folha: mantenha o marcador inteiro na câmera.';});
 model.addEventListener('model-loaded',()=>post('ar:model-loaded'));
 model.addEventListener('model-error',()=>error('ar:model-error','load','Não foi possível carregar o modelo.'));
 scene.addEventListener('renderstart',()=>scene.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5)));
 document.body.append(scene);
}
window.addEventListener('camera-init',()=>{if(stopped){document.querySelectorAll('video').forEach(v=>v.srcObject?.getTracks().forEach(t=>t.stop()));return;}post('ar:ready');status.textContent='Aponte para o quadrado preto da folha.';});
window.addEventListener('camera-error',e=>{const err=e.detail?.error||e.detail;const code=err?.name||'unknown';error(code==='NotAllowedError'?'ar:camera-denied':'ar:camera-error',code,code==='NotAllowedError'?'Câmera bloqueada. Autorize nas permissões do site.':'Não foi possível acessar a câmera.');});
const overlay=document.querySelector('#gestures');let previous=null;
overlay.addEventListener('touchstart',e=>{previous=Array.from(e.touches).map(t=>({x:t.clientX,y:t.clientY}));},{passive:true});
overlay.addEventListener('touchmove',e=>{e.preventDefault();const next=Array.from(e.touches).map(t=>({x:t.clientX,y:t.clientY}));if(previous?.length===1&&next.length===1){rotation+=(next[0].x-previous[0].x)*.4;tilt=Math.max(-20,Math.min(20,tilt+(next[0].y-previous[0].y)*.15));}else if(previous?.length===2&&next.length===2){const distance=p=>Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);scale=Math.max(.5,Math.min(3,scale*distance(next)/Math.max(distance(previous),1)));}previous=next;transform();},{passive:false});
overlay.addEventListener('touchend',()=>{previous=null;});
if(!embedded){
 document.querySelector('#standalone').style.display='block';const back=document.querySelector('#back');back.href=`../?continente=${encodeURIComponent(id||'')}#/continente/${encodeURIComponent(id||'')}`;back.addEventListener('click',stop);
 document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{const type=b.dataset.action;if(type==='plus')action('ar:set-scale',{scale:scale+.25});if(type==='minus')action('ar:set-scale',{scale:scale-.25});if(type==='rotate')action('ar:rotate',{degrees:30});if(type==='reset')action('ar:reset');}));
 const prompt=document.createElement('div');prompt.id='start';prompt.innerHTML='<h1>Realidade aumentada</h1><p>Separe a folha do continente. O modelo acompanhará o quadrado preto.</p><button>Iniciar câmera</button>';prompt.querySelector('button').onclick=()=>{prompt.remove();start();};document.body.append(prompt);
}else start();
