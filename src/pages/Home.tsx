import { Link } from 'react-router-dom';
import { useApp, safePreference } from '../hooks/useApp';
import { asset } from '../services/contentRepository';
import { InterfaceIcon } from '../components/InterfaceIcon';

export default function Home() {
  const { unlocked } = useApp();
  return <main className="home">
    <section className="welcome-world" aria-labelledby="welcome-title">
    <div className="hero-art"><img className="travel-friends" src={asset('images/planeta-guia.svg')} width="640" height="470" alt="Um planeta roxo sorridente acena e leva uma bússola para a aventura" /></div>
    <div className="hero-copy">
      <h1 id="welcome-title">Um mundo inteiro<br />para descobrir!</h1>
      <p>Vamos nessa? Encontre os QR Codes da sua turma e conheça os seis continentes.</p>
      <div className="actions">
        <Link className="button primary" to={safePreference('exploradores:intro:v1') ? '/mapa' : '/orientacao'}><InterfaceIcon name="compass" />Explorar</Link>
        <Link className="button secondary" to="/mapa"><InterfaceIcon name="book" />Minha coleção</Link>
      </div>
    </div>
    </section>
      <div className="hero-progress"><span className="tiny-globe"><InterfaceIcon name="map" /></span><div>
        <strong>{unlocked.length} de 6 continentes descobertos</strong>
        <span>Suas descobertas ficam neste navegador.</span>
      </div></div>
    <Link className="home-how" to="/orientacao"><InterfaceIcon name="scan" /><span><strong>Primeira aventura?</strong><span>Veja como jogar com a folha da turma.</span></span><span aria-hidden="true">›</span></Link>
    <div className="home-organizer"><div><h2>Espaço de quem ensina</h2><p>Prepare as fichas e atividades da turma.</p></div><Link className="button secondary" to="/organizador">Organizador</Link></div>
  </main>;
}
