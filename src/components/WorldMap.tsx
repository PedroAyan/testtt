import data from '../data/generated/map.json';
import type { ContinentId } from '../types/continent';
import { useApp } from '../hooks/useApp';
import { activityContinents } from '../services/activities';
import { InterfaceIcon } from './InterfaceIcon';

const continentFill: Record<ContinentId, string> = {
  africa: 'var(--yellow)', america: 'var(--warm)', antartida: 'var(--surface)',
  asia: 'var(--success-tint)', europa: 'var(--tint-strong)', oceania: 'var(--water)',
};

export function WorldMap({ onSelect, selected, activity = false }: {
  onSelect: (id: ContinentId) => void; selected?: ContinentId; activity?: boolean;
}) {
  const { unlocked, completed, continents } = useApp();
  const done = activityContinents(completed);
  return <div className="world-map-container">
    <div className="world-wrap">
      <svg viewBox="0 0 1000 510" className="world-map" role="group" aria-label="Mapa dos seis continentes">
        <defs><pattern id="ocean-grid" width="125" height="127.5" patternUnits="userSpaceOnUse"><path d="M125 0H0V127.5" fill="none" stroke="var(--map-grid)" strokeOpacity=".06" /></pattern></defs>
        <rect width="1000" height="510" fill="var(--tint-soft)" /><rect width="1000" height="510" fill="url(#ocean-grid)" />
        {data.map(c => {
          const id = c.id as ContinentId, open = unlocked.includes(id), available = continents.some(c => c.id === id);
          const state = open ? `descoberto${done.includes(id) ? ', atividade concluída' : ''}` : 'bloqueado';
          return <g key={id} className={`map-region ${selected === id ? 'selected' : ''}`}>
            <path id={id} d={c.d} fill={activity || open ? continentFill[id] : 'var(--map-locked)'} stroke="var(--surface)" strokeWidth="2" role="button" tabIndex={available ? 0 : -1} aria-disabled={!available} aria-label={`${c.nome}${activity ? '' : `, ${state}`}`} onClick={() => available && onSelect(id)} onKeyDown={e => { if (available && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect(id); } }} />
          </g>;
        })}
      </svg>
      {!activity && <div className="map-places" aria-label="Escolher continente no mapa">{continents.map(c => <button key={c.id} aria-pressed={selected === c.id} onClick={() => onSelect(c.id)} aria-label={`${c.nome}, ${unlocked.includes(c.id) ? `descoberto${done.includes(c.id) ? ', atividade concluída' : ''}` : 'ainda não descoberto'}`}>
        <span aria-hidden="true">{done.includes(c.id) ? '★' : unlocked.includes(c.id) ? '✓' : <InterfaceIcon name="lock" />}</span>{c.nome}
      </button>)}</div>}
    </div>
    <p className="map-help">Toque no mapa ou escolha pelo nome.</p>
  </div>;
}
