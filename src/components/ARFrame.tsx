import { useLayoutEffect, useRef } from 'react';
import type { Continent } from '../types/continent';
import { receiveARMessage, sendARMessage, type ARMessage } from '../services/arBridge';
import { asset } from '../services/contentRepository';
export function ARFrame({continent,onMessage,onWindow,session=0}:{continent:Continent;onMessage:(message:ARMessage)=>void;onWindow:(target:Window|null)=>void;session?:number}){
 const host=useRef<HTMLDivElement>(null),callback=useRef(onMessage),windowCallback=useRef(onWindow);callback.current=onMessage;windowCallback.current=onWindow;
 const reposition=useRef<()=>void>(()=>{});
 useLayoutEffect(()=>{reposition.current();});
 useLayoutEffect(()=>{
  // O iframe nasce fora da árvore React e não é movido: mover um iframe pode
  // recriar seu documento, impedindo a confirmação de teardown.
  const layer=document.createElement('div');layer.className='ar-layer';document.body.append(layer);
  const frame=document.createElement('iframe');frame.allow='camera; fullscreen';frame.title=`Realidade aumentada de ${continent.nome}`;
  frame.src=`${asset('ar/scene.html')}?continente=${continent.id}&model=${encodeURIComponent(continent.modelo.arquivo)}`;
  let stopping=false,timer:ReturnType<typeof setTimeout>|undefined;
  frame.onload=()=>{if(stopping)sendARMessage(frame.contentWindow,'ar:stop');};
  const remove=()=>{if(timer)clearTimeout(timer);window.removeEventListener('message',listener);layer.remove();};
  const listener=(event:MessageEvent)=>{const message=receiveARMessage(event,frame.contentWindow,location.origin,continent.id);if(!message)return;if(message.type==='ar:stopped'){remove();return;}if(!stopping)callback.current(message);};
  const position=()=>{const rect=host.current?.getBoundingClientRect();if(rect)Object.assign(layer.style,{left:`${rect.left+window.scrollX}px`,top:`${rect.top+window.scrollY}px`,width:`${rect.width}px`,height:`${rect.height}px`});};
  reposition.current=position;const observer=new ResizeObserver(position);if(host.current)observer.observe(host.current);window.addEventListener('resize',position);
  window.addEventListener('message',listener);layer.append(frame);position();windowCallback.current(frame.contentWindow);
  return()=>{
   stopping=true;observer.disconnect();window.removeEventListener('resize',position);reposition.current=()=>{};windowCallback.current(null);
   layer.hidden=true;sendARMessage(frame.contentWindow,'ar:stop');
   timer=setTimeout(()=>{console.warn('AR: sem confirmação de parada em 1500 ms; removendo iframe.');remove();},1500);
  };
 },[continent.id,continent.modelo.arquivo,session]);
 return <div ref={host} className="ar-frame"/>;
}
