import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../services/contentRepository';
import type { Continent } from '../types/continent';

export function DestinationCard({ continent: c, discovered, completed, selected, onSelect }: {
  continent: Continent; discovered: boolean; completed: boolean; selected: boolean; onSelect: () => void;
}) {
  return <article className={`continent-card ${discovered ? 'discovered' : ''} ${selected ? 'selected' : ''}`} style={{ '--continent-color': c.cor } as CSSProperties}>
    <button className="continent-select" onClick={onSelect} aria-label={`${c.nome}, ${discovered ? 'descoberto. Revisitar continente' : 'ainda não descoberto. Ver dica do QR'}`}>
      <span className="destination-art"><img className={discovered ? '' : 'locked-shape'} src={asset(`images/silhouettes/${c.id}.svg`)} alt="" /><span className="destination-spark" aria-hidden="true">✦</span></span>
      <h3>{c.nome}</h3>
      <span className="card-state">{discovered ? '✓ Descoberto' : '🔒 A descobrir'}</span>
      <span className="destination-prompt">{discovered ? 'Vamos revisitar?' : 'Encontre o QR'}</span>
    </button>
    {discovered && <Link className="card-activity" to={`/atividade/${c.id}`}>{completed ? '★ Concluída · refazer' : 'Fazer atividade'}<span className="sr-only"> de {c.nome}</span></Link>}
  </article>;
}
