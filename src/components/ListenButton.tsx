import { useEffect, useRef, useState } from 'react';
import { asset } from '../services/contentRepository';
export function ListenButton({text,audioUrl}:{text:string;audioUrl?:string}){
 const [voice,setVoice]=useState<SpeechSynthesisVoice|undefined>(),[playing,setPlaying]=useState(false);const audio=useRef<HTMLAudioElement|null>(null);
 useEffect(()=>{if(!('speechSynthesis'in window))return;const update=()=>setVoice(speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()==='pt-br'));update();speechSynthesis.addEventListener('voiceschanged',update);return()=>{speechSynthesis.removeEventListener('voiceschanged',update);speechSynthesis.cancel();audio.current?.pause();};},[]);
 if(!audioUrl&&!voice)return null;
 function play(){if(playing){speechSynthesis?.cancel();audio.current?.pause();setPlaying(false);return;}setPlaying(true);if(audioUrl){audio.current=new Audio(asset(audioUrl));audio.current.onended=()=>setPlaying(false);audio.current.onerror=()=>setPlaying(false);void audio.current.play().catch(()=>setPlaying(false));}else{const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.voice=voice||null;u.onend=()=>setPlaying(false);u.onerror=()=>setPlaying(false);speechSynthesis.speak(u);}}
 return <button className="button secondary" onClick={play}>{playing?'Parar áudio':'♬ Ouvir'}</button>;
}
