import data from '../data/generated/map.json';
import type { ContinentId } from '../types/continent';
import { useApp } from '../hooks/useApp';
import { activityContinents } from '../services/activities';
export function WorldMap({onSelect,selected,activity=false}:{onSelect:(id:ContinentId)=>void;selected?:ContinentId;activity?:boolean}){
 const {unlocked,completed,continents}=useApp(),done=activityContinents(completed);
 return <div className="world-map-container"><div className="world-wrap"><svg viewBox="0 0 1000 510" className="world-map" role="group" aria-label="Mapa dos seis continentes">
 <defs><pattern id="ocean-grid" width="60" height="50" patternUnits="userSpaceOnUse"><path d="M60 0H0V50" fill="none" stroke="var(--map-grid)" strokeOpacity=".06"/></pattern></defs>
 <rect width="1000" height="510" rx="30" fill="var(--tint-soft)"/><rect width="1000" height="510" rx="30" fill="url(#ocean-grid)"/>
 {data.map(c=>{const id=c.id as ContinentId,open=unlocked.includes(id),available=continents.some(c=>c.id===id),symbol=activity?'':done.includes(id)?'★':open?'✓':'🔒';return <g key={id} className={`map-region ${selected===id?'selected':''}`}><path id={id} d={c.d} fill={activity||open?c.cor:'var(--map-locked)'} stroke="var(--surface)" strokeWidth="1" role="button" tabIndex={available?0:-1} aria-disabled={!available} aria-label={`${c.nome}${activity?'':open?`, descoberto${done.includes(id)?', atividade concluída':''}`:', bloqueado'}`} onClick={()=>available&&onSelect(id)} onKeyDown={e=>{if(available&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onSelect(id);}}}/><g aria-hidden="true" onClick={()=>available&&onSelect(id)} className="map-label" transform={`translate(${c.label[0]},${c.label[1]})`}><rect x="-78" y="-28" width="156" height="56" rx="20"/><text textAnchor="middle" dy="6">{symbol} {c.nome}</text></g></g>;})}
 </svg></div><p className="map-help">Deslize o mapa para os lados ou escolha pelos nomes abaixo.</p></div>;
}
