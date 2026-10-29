import { Link } from 'react-router-dom';
import { useApp, safePreference } from '../hooks/useApp';
import { asset } from '../services/contentRepository';
import { InterfaceIcon } from '../components/InterfaceIcon';

export default function Home() {
  const { unlocked } = useApp();
  return <main className="home">
    <section className="welcome-world" aria-labelledby="welcome-title">
    <div className="hero-copy">
      <p className="hero-intro"><InterfaceIcon name="compass" />Sua próxima descoberta começa aqui</p>
      <h1 id="welcome-title">Um mundo inteiro<br />para descobrir.</h1>
      <p>Uma folha, uma pista e seis continentes. Escolha um lugar e comece sua viagem.</p>
      <div className="actions">
        <Link className="button primary" to={safePreference('exploradores:intro:v1') ? '/mapa' : '/orientacao'}><InterfaceIcon name="compass" />Explorar</Link>
        <Link className="button secondary" to="/mapa"><InterfaceIcon name="book" />Minha coleção</Link>
      </div>
    </div>
    <div className="hero-art"><div className="planet-halo" aria-hidden="true" /><img className="travel-friends" src={asset('images/planeta-guia.svg')} width="640" height="470" alt="Um planeta verde sorridente acena e leva uma bússola para a aventura" /><span className="hero-caption"><InterfaceIcon name="map" />6 continentes. Muitas descobertas.</span></div>
    </section>
    <Link className="mission-link" to={safePreference('exploradores:intro:v1') ? '/mapa' : '/orientacao'}>
      <span className="mission-icon"><InterfaceIcon name="scan" /></span><span><strong>Uma pista, um novo destino</strong><span>Escolha um continente e encontre seu QR code.</span></span><InterfaceIcon name="arrow-right" />
    </Link>
      <div className="hero-progress"><span className="progress-count">{unlocked.length}<span> / 6</span></span><div>
        <strong>Continentes descobertos</strong>
        <span>Suas descobertas ficam neste navegador.</span>
      </div></div>
    <Link className="home-how" to="/orientacao"><span className="mission-icon"><InterfaceIcon name="book" /></span><span><strong>Primeira aventura?</strong><span>Veja como jogar com a folha da turma.</span></span><InterfaceIcon name="chevron-right" /></Link>
    <div className="home-organizer"><div><h2>Espaço de quem ensina</h2><p>Prepare as fichas e atividades da turma.</p></div><Link className="button secondary" to="/organizador">Organizador</Link></div>
  </main>;
}
