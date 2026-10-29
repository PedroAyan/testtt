import { Link } from 'react-router-dom';
import { useApp, safePreference } from '../hooks/useApp';
import { asset } from '../services/contentRepository';

export default function Home() {
  const { unlocked } = useApp();
  return <main className="home">
    <div className="hero-copy"><span className="eyebrow"><i /> PEQUENOS EXPLORADORES, GRANDES DESCOBERTAS</span>
      <h1>Olá, explorador!<br /><em>Vamos conhecer o mundo?</em></h1>
      <p>Encontre as folhas da sua turma, descubra os seis continentes e aprenda brincando. Cada QR abre uma nova aventura!</p>
      <div className="actions">
        <Link className="button primary" to={safePreference('exploradores:intro:v1') ? '/mapa' : '/orientacao'}>Explorar <span aria-hidden="true">↗</span></Link>
        <Link className="button secondary" to="/organizador">Organizador</Link>
      </div>
      <div className="hero-progress"><span className="tiny-globe" aria-hidden="true">✦</span><div>
        <strong>{unlocked.length} de 6 continentes descobertos</strong>
        <Link className="back-link" to="/mapa">Minha coleção →</Link>
      </div></div>
    </div>
    <div className="hero-art"><img className="travel-friends" src={asset('images/companheiros-de-viagem.svg')} alt="Um planeta sorridente e uma bússola entre estrelas e nuvens coloridas" />
      <div className="floating-card"><span className="card-icon" aria-hidden="true">✧</span><div><strong>Uma surpresa em cada continente</strong><span>Encontre. Descubra. Aprenda.</span></div></div>
    </div>
    <div className="home-bottom"><span>01 <strong>Escolha um continente</strong></span><span>02 <strong>Encontre o QR da folha</strong></span><span>03 <strong>Explore e aprenda</strong></span><Link to="/orientacao">Como jogar ↗</Link></div>
  </main>;
}
