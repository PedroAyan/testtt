import { Link } from 'react-router-dom';
import { useApp, safePreference } from '../hooks/useApp';
import { asset } from '../services/contentRepository';

export default function Home() {
  const { unlocked } = useApp();
  return <main className="home">
    <div className="hero-copy"><span className="eyebrow">Uma aventura em seis continentes</span>
      <h1>O mundo espera<br />por você!</h1>
      <p>Escolha um continente, encontre o QR da folha da sua turma e descubra um mundo de histórias.</p>
      <div className="actions">
        <Link className="button primary" to={safePreference('exploradores:intro:v1') ? '/mapa' : '/orientacao'}>Explorar <span aria-hidden="true">↗</span></Link>
        <Link className="button secondary" to="/mapa">Minha coleção</Link>
      </div>
      <div className="hero-progress"><span className="tiny-globe" aria-hidden="true">✦</span><div>
        <strong>{unlocked.length} de 6 continentes descobertos</strong>
        <span>Cada descoberta fica guardada neste navegador.</span>
      </div></div>
    </div>
    <div className="hero-art"><img className="travel-friends" src={asset('images/companheiros-de-viagem.svg')} alt="Um planeta sorridente e uma bússola entre estrelas e nuvens coloridas" />
      <div className="floating-card"><span className="card-icon" aria-hidden="true">✧</span><div><strong>Uma surpresa em cada continente</strong><span>Encontre. Descubra. Aprenda.</span></div></div>
    </div>
    <div className="home-bottom"><span><b aria-hidden="true">1</b> Escolha um continente</span><span><b aria-hidden="true">2</b> Encontre o QR da folha</span><span><b aria-hidden="true">3</b> Explore e aprenda</span><Link to="/orientacao">Como jogar</Link></div>
    <div className="home-organizer"><div><h2>Preparando a aventura da turma?</h2><p>Organize fichas, dicas e atividades.</p></div><Link className="button secondary" to="/organizador">Organizador</Link></div>
  </main>;
}
