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
    <div className="page-heading collection-heading"><div><h1>Meu mapa</h1><p>Escolha o próximo continente.</p></div><Link className="text-link" to="/orientacao">Como jogar</Link></div>
    <div className="progress-row">
      <div><strong>{app.unlocked.length} <small>de 6</small></strong><span>Continentes descobertos</span><progress aria-label="Continentes descobertos" max="6" value={app.unlocked.length} /></div>
      <div><strong>{completed.length} <small>de 6</small></strong><span>Atividades concluídas</span><progress aria-label="Continentes com atividades concluídas" max="6" value={completed.length} /></div>
    </div>
    <p className="map-invitation">{app.unlocked.length < 6 ? 'Encontre os QR codes para descobrir os continentes.' : 'Você descobriu os seis continentes. Continue aprendendo!'}</p>
    {isExplorationComplete(app.unlocked) && <Link className="celebration" to="/conclusao">✦ {completed.length === 6 ? 'Exploração e atividades completas!' : 'Os seis continentes estão no seu mapa!'} Ver conquista ↗</Link>}
    <WorldMap selected={selected} onSelect={select} />
    <div className="map-legend"><span><InterfaceIcon name="lock" />A descobrir</span><span>✓ Descoberto</span><span>★ Atividade concluída</span></div>
    <div className="section-label"><h2>Os seis continentes</h2></div>
    <div className="continent-grid">{app.continents.map(c => <DestinationCard key={c.id} continent={c} discovered={app.unlocked.includes(c.id)} completed={completed.includes(c.id)} selected={selected === c.id} onSelect={() => select(c.id)} />)}</div>
  </main>;
}
