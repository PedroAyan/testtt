import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp, safePreference } from '../hooks/useApp';
import { isContinentId } from '../services/collectionRepository';
import { WorldMap } from '../components/WorldMap';
import { activityContinents, isExplorationComplete } from '../services/activities';
import type { ContinentId } from '../types/continent';
import { DestinationCard } from '../components/DestinationCard';
import { InterfaceIcon } from '../components/InterfaceIcon';

export default function Collection() {
  const app = useApp(), navigate = useNavigate();
  const [selected, setSelected] = useState<ContinentId | undefined>(() => {
    const id = safePreference('exploradores:selected:v1');
    return isContinentId(id) ? id : undefined;
  });
  const completed = activityContinents(app.completed);
  const select = (id: ContinentId) => {
    setSelected(id); safePreference('exploradores:selected:v1', id); navigate(`/continente/${id}`);
  };
  return <main className="collection-page">
    <div className="page-heading collection-heading"><div><h1>Seu mundo de descobertas.</h1><p>Qual lugar vamos conhecer hoje?</p></div><span className="collection-emblem"><InterfaceIcon name="compass" /></span></div>
    <div className="collection-help"><p>Toque em um continente para começar.</p><Link className="button secondary" to="/orientacao">Como jogar</Link></div>
    <div className="progress-row">
      <div><span><InterfaceIcon name="compass" />Continentes descobertos</span><strong>{app.unlocked.length} <small>de 6</small></strong><progress aria-label="Continentes descobertos" max="6" value={app.unlocked.length} /><small>{Math.round(app.unlocked.length / 6 * 100)}% do mapa descoberto</small></div>
      <div><span><InterfaceIcon name="spark" />Atividades concluídas</span><strong>{completed.length} <small>de 6</small></strong><progress aria-label="Continentes com atividades concluídas" max="6" value={completed.length} /><small>Uma atividade por continente</small></div>
    </div>
    <p className="map-invitation">{app.unlocked.length < 6 ? 'Encontre os QR codes para descobrir os continentes.' : 'Você descobriu os seis continentes. Continue aprendendo!'}</p>
    {isExplorationComplete(app.unlocked) && <Link className="celebration" to="/conclusao">✦ {completed.length === 6 ? 'Exploração e atividades completas!' : 'Os seis continentes estão no seu mapa!'} Ver conquista ↗</Link>}
    <WorldMap selected={selected} onSelect={select} />
    <div className="map-legend"><span>🔒 Ainda não descoberto</span><span>✓ Descoberto</span><span>★ Atividade concluída</span></div>
    <div className="section-label"><h2>Escolha seu próximo destino</h2><span>Os mesmos lugares do mapa, bem de pertinho.</span></div>
    <div className="continent-grid">{app.continents.map(c => <DestinationCard key={c.id} continent={c} discovered={app.unlocked.includes(c.id)} completed={completed.includes(c.id)} selected={selected === c.id} onSelect={() => select(c.id)} />)}</div>
  </main>;
}
