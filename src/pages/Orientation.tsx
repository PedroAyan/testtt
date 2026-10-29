import { Link, useNavigate } from 'react-router-dom';
import { useApp, safePreference } from '../hooks/useApp';
import { SCHOOL_YEARS, type SchoolYear } from '../types/continent';
import { GuideScene } from '../components/GuideScene';
import { InterfaceIcon } from '../components/InterfaceIcon';

export default function Orientation() {
  const app = useApp(), navigate = useNavigate();
  const finish = () => { safePreference('exploradores:intro:v1', '1'); navigate('/mapa'); };
  return <main className="narrow orientation-page">
    <Link className="back-link" to="/">← Voltar ao início</Link>
    <h1>Sua aventura<br />começa aqui.</h1>
    <p className="orientation-lead">Pegue a folha da turma. Vamos por partes!</p>
    <ol className="steps">
      <li><GuideScene kind="map" /><div><strong>Escolha no mapa</strong><span>Toque no continente que quer conhecer.</span></div></li>
      <li><GuideScene kind="sheet" /><div><strong>Leia o QR Code</strong><span>Procure o QR na folha e leia aqui no app. Ele guarda sua descoberta.</span></div></li>
      <li><GuideScene kind="ar" /><div><strong>Veja em realidade aumentada</strong><span>Aponte a câmera para o marcador: o quadrado preto da folha. O modelo 3D aparece sobre ele!</span></div></li>
    </ol>
    <p className="notice">Depois da descoberta, você pode estudar sem câmera. Use boa iluminação e peça ajuda ao professor se precisar.</p>
    <label className="field">Qual é o seu ano?<select value={app.year} onChange={e => void app.setYear(e.target.value as SchoolYear)}>{SCHOOL_YEARS.map(y => <option key={y} value={y}>{y === 'geral' ? 'Prefiro pular' : `${y}º ano`}</option>)}</select><small>Você pode pular e escolher depois em Configurações.</small></label>
    <div className="actions"><button className="button primary" onClick={finish}><InterfaceIcon name="compass" />Explorar o mapa</button><Link className="button secondary" to="/">Voltar ao início</Link></div>
  </main>;
}
