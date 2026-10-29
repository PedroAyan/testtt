import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useApp, repository } from '../hooks/useApp';
import { discoverFromQR } from '../services/discovery';
import { asset } from '../services/contentRepository';
type Decoder=(data:Uint8ClampedArray,width:number,height:number,options?:{inversionAttempts:string})=>{data:string}|null;
let decoderPromise:Promise<Decoder>|undefined;
function loadDecoder(){return decoderPromise??=new Promise((resolve,reject)=>{const existing=(window as Window&{jsQR?:Decoder}).jsQR;if(existing){resolve(existing);return;}const script=document.createElement('script');script.src=asset('vendor/jsQR-1.4.0.js');script.onload=()=>{const decode=(window as Window&{jsQR?:Decoder}).jsQR;if(decode)resolve(decode);else reject(new Error('Leitor indisponível.'));};script.onerror=()=>{decoderPromise=undefined;reject(new Error('Falha ao carregar o leitor.'));};document.head.append(script);});}
export default function QRScanner(){
 const {id}=useParams(),app=useApp(),navigate=useNavigate(),c=app.continents.find(c=>c.id===id);
 const video=useRef<HTMLVideoElement>(null),stop=useRef<()=>void>(()=>{}),[attempt,setAttempt]=useState(0),[status,setStatus]=useState('Preparando o leitor…'),[error,setError]=useState(false);
 useEffect(()=>{
  if(!c)return;let active=true,stream:MediaStream|undefined,raf=0,last=0;
  const close=()=>{active=false;cancelAnimationFrame(raf);stream?.getTracks().forEach(t=>t.stop());if(video.current)video.current.srcObject=null;};stop.current=close;
  async function start(){
   try{
    if(!window.isSecureContext)throw new Error('Abra o site por HTTPS para usar a câmera.');
    if(!navigator.mediaDevices?.getUserMedia)throw new Error('Este navegador não oferece acesso à câmera.');
    setError(false);setStatus('Autorize a câmera quando o navegador pedir.');
    const decode=await loadDecoder();if(!active)return;
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280}},audio:false});
    if(!active){stream.getTracks().forEach(t=>t.stop());return;}
    const el=video.current;if(!el){close();return;}el.srcObject=stream;await el.play();if(!active)return;
    setStatus('Enquadre o QR Code da folha inteira no centro.');
    const canvas=document.createElement('canvas'),context=canvas.getContext('2d',{willReadFrequently:true});if(!context)throw new Error('O navegador não consegue processar a câmera.');
    const frame=async(now:number)=>{
     if(!active)return;
     if(el.readyState>=2&&now-last>150){last=now;canvas.width=Math.min(640,el.videoWidth);canvas.height=Math.round(el.videoHeight*canvas.width/el.videoWidth);context.drawImage(el,0,0,canvas.width,canvas.height);const pixels=context.getImageData(0,0,canvas.width,canvas.height);const code=decode(pixels.data,canvas.width,canvas.height,{inversionAttempts:'dontInvert'});
      if(code){close();const result=await discoverFromQR(repository,code.data,c!.id,import.meta.env.VITE_PUBLIC_URL||new URL(import.meta.env.BASE_URL,location.origin).href);if(result.ok){await app.refresh();navigate(`/continente/${c!.id}`,{replace:true,state:{discovered:true}});}else{setStatus(result.reason);setError(true);}return;}
     }
     raf=requestAnimationFrame(t=>{void frame(t);});
    };raf=requestAnimationFrame(t=>{void frame(t);});
   }catch(e){if(!active)return;close();const name=e instanceof DOMException?e.name:'';setError(true);setStatus(name==='NotAllowedError'?'Câmera bloqueada. No ícone de permissões do navegador, autorize a câmera para este site e tente novamente.':name==='NotFoundError'?'Não encontramos uma câmera neste aparelho. Peça ajuda ao professor.':e instanceof Error?e.message:'Não foi possível abrir a câmera. Feche outros apps e tente novamente.');}
  }
  void start();const visibility=()=>{if(document.hidden&&active){close();setError(true);setStatus('Leitura pausada. Toque em Tentar novamente para continuar.');}};document.addEventListener('visibilitychange',visibility);return()=>{close();document.removeEventListener('visibilitychange',visibility);};
 },[c?.id,attempt]);
 if(!c)return <Navigate to="/mapa" replace/>;
 return <main className="narrow"><span className="eyebrow">DESCOBRIR {c.nome.toLocaleUpperCase('pt-BR')}</span><h1>Um QR,<br/><em>um novo destino.</em></h1><div className={`scanner ${error?'scanner-error':''}`}><video ref={video} muted playsInline aria-label="Câmera para leitura do QR Code"/><div className="scan-guide" aria-hidden="true"/></div><p role={error?'alert':'status'}>{status}</p><p className="micro">Procure o QR ao lado do marcador preto na folha de {c.nome}. Use boa iluminação e evite reflexos.</p><div className="actions">{error&&<button className="button primary" onClick={()=>setAttempt(n=>n+1)}>Tentar novamente</button>}<button className="button secondary" onClick={()=>{stop.current();navigate('/mapa');}}>Cancelar</button><Link className="button secondary" onClick={()=>stop.current()} to="/mapa">Voltar ao mapa</Link></div></main>;
}
