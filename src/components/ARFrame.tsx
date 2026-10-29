import { useEffect, useRef } from 'react';
import type { Continent } from '../types/continent';
import { receiveARMessage, sendARMessage, type ARMessage } from '../services/arBridge';
import { asset } from '../services/contentRepository';
export function ARFrame({continent,onMessage,onWindow,session=0}:{continent:Continent;onMessage:(message:ARMessage)=>void;onWindow:(target:Window|null)=>void;session?:number}){
 const host=useRef<HTMLDivElement>(null),callback=useRef(onMessage),windowCallback=useRef(onWindow);callback.current=onMessage;windowCallback.current=onWindow;
 useEffect(()=>{
  const frame=document.createElement('iframe');frame.allow='camera; fullscreen';frame.title=`Realidade aumentada de ${continent.nome}`;
  frame.src=`${asset('ar/scene.html')}?continente=${continent.id}&model=${encodeURIComponent(continent.modelo.arquivo)}`;
  let stopping=false,timer:ReturnType<typeof setTimeout>|undefined;
  frame.onload=()=>{if(stopping)sendARMessage(frame.contentWindow,'ar:stop');};
  const remove=()=>{if(timer)clearTimeout(timer);window.removeEventListener('message',listener);frame.remove();};
  const listener=(event:MessageEvent)=>{const message=receiveARMessage(event,frame.contentWindow,location.origin,continent.id);if(!message)return;if(message.type==='ar:stopped'){remove();return;}if(!stopping)callback.current(message);};
  window.addEventListener('message',listener);host.current?.append(frame);windowCallback.current(frame.contentWindow);
  return()=>{
   stopping=true;windowCallback.current(null);
   // Preserva o iframe até o ACK mesmo se o React já desmontou a tela.
   frame.hidden=true;document.body.append(frame);sendARMessage(frame.contentWindow,'ar:stop');
   timer=setTimeout(()=>{console.warn('AR: sem confirmação de parada em 1500 ms; removendo iframe.');remove();},1500);
  };
 },[continent.id,continent.modelo.arquivo,session]);
 return <div ref={host} className="ar-frame"/>;
}
