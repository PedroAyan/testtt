import { Link, useNavigate } from 'react-router-dom';
import { useApp, safePreference } from '../hooks/useApp';
import { SCHOOL_YEARS, type SchoolYear } from '../types/continent';
import { asset } from '../services/contentRepository';

export default function Orientation() {
  const app = useApp(), navigate = useNavigate();
  const finish = () => { safePreference('exploradores:intro:v1', '1'); navigate('/mapa'); };
  return <main className="narrow orientation-page">
    <Link className="back-link" to="/">← Voltar ao início</Link>
    <span className="eyebrow">Tudo pronto para a aventura?</span>
    <h1>Vamos explorar<br />juntos!</h1>
    <img className="guide-image" src={asset('images/guia-qr.svg')} alt="Uma folha do continente com QR Code à esquerda e marcador preto à direita" />
    <ol className="steps">
      <li><strong>Escolha no mapa</strong><span>Toque no continente que quer descobrir.</span></li>
      <li><strong>Encontre a folha</strong><span>Procure o material da turma e leia o QR aqui no app.</span></li>
      <li><strong>Veja o mundo em 3D</strong><span>Para usar a realidade aumentada, aponte a câmera para o quadrado preto da folha.</span></li>
    </ol>
    <p className="notice">Depois da descoberta, você pode estudar sem câmera. Use boa iluminação e peça ajuda ao professor se precisar.</p>
    <label className="field">Qual é o seu ano?<select value={app.year} onChange={e => void app.setYear(e.target.value as SchoolYear)}>{SCHOOL_YEARS.map(y => <option key={y} value={y}>{y === 'geral' ? 'Prefiro pular' : `${y}º ano`}</option>)}</select><small>Você pode pular e escolher depois em Configurações.</small></label>
    <div className="actions"><button className="button primary" onClick={finish}>Explorar o mapa</button><Link className="button secondary" to="/">Voltar ao início</Link></div>
  </main>;
}
