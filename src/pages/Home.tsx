import { Link } from 'react-router-dom';
import { useApp, safePreference } from '../hooks/useApp';
import { asset } from '../services/contentRepository';
import { InterfaceIcon } from '../components/InterfaceIcon';
import { AtlasCover } from '../components/AtlasCover';

export default function Home() {
  const { unlocked, continents } = useApp();
  const explore = safePreference('exploradores:intro:v1') ? '/mapa' : '/orientacao';
  return <main className="home">
    <section className="home-start" aria-labelledby="welcome-title">
      <h1 id="welcome-title">Qual continente<br />vamos conhecer?</h1>
      <p>Pegue a folha da turma. A viagem começa no mapa.</p>
      <div className="atlas-ticket">
        <div className="atlas-ticket-heading"><InterfaceIcon name="map" /><span>Seu mapa de exploração</span></div>
        <AtlasCover />
        <div className="atlas-ticket-bottom"><span>6 continentes para descobrir</span><InterfaceIcon name="compass" /></div>
      </div>
      <div className="home-start-actions">
        <Link className="button primary" to={explore}>Explorar<InterfaceIcon name="arrow-right" /></Link>
        <Link className="button secondary" to="/mapa"><InterfaceIcon name="book" />Minha coleção</Link>
      </div>
    </section>
    <section className="home-passport" aria-labelledby="passport-title">
      <div className="section-label"><h2 id="passport-title">Suas descobertas</h2><span>{unlocked.length} de 6</span></div>
      <div className="discovery-stamps" aria-hidden="true">{continents.map(c => <span key={c.id} className={unlocked.includes(c.id) ? 'stamp found' : 'stamp'}><img src={asset(`images/silhouettes/${c.id}.svg`)} alt="" />{unlocked.includes(c.id) && <b>✓</b>}</span>)}</div>
      <p>{unlocked.length === 0 ? 'Seu primeiro continente está esperando.' : 'Cada continente descoberto fica guardado aqui.'}</p>
      <p className="micro">Progresso salvo neste navegador.</p>
    </section>
    <Link className="help-row" to="/orientacao"><span className="help-icon"><InterfaceIcon name="scan" /></span><span><strong>Como jogar</strong><span>Da folha ao seu mapa, passo a passo.</span></span><InterfaceIcon name="chevron-right" /></Link>
    <Link className="teacher-row" to="/organizador"><span><strong>Organizador</strong><span>Fichas e atividades da turma</span></span><InterfaceIcon name="chevron-right" /></Link>
  </main>;
}
