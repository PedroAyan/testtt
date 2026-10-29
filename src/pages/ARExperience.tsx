import { useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useApp, activeCollectionRepository } from '../hooks/useApp';
import { ARFrame } from '../components/ARFrame';
import { discoverFromMarker } from '../services/discovery';
import { sendARMessage, type ARMessage } from '../services/arBridge';
import { asset } from '../services/contentRepository';

export default function ARExperience() {
  const { id } = useParams(), app = useApp(), c = app.continents.find(c => c.id === id);
  const target = useRef<Window | null>(null), scale = useRef(1);
  const [status, setStatus] = useState('Carregando a cena. Autorize o uso da câmera quando o navegador pedir.');
  const [error, setError] = useState(false), [found, setFound] = useState(false), [session, setSession] = useState(0);
  if (!c) return <Navigate to="/mapa" replace />;
  const continent = c, unlocked = app.unlocked.includes(c.id);
  async function message(m: ARMessage) {
    switch (m.type) {
      case 'ar:ready': setStatus('Câmera pronta. Aponte para o quadrado preto da folha.'); break;
      case 'ar:marker-found':
        if (await discoverFromMarker(activeCollectionRepository(), continent.id, m.payload)) {
          await app.refresh(); setFound(true); setStatus('Continente descoberto! O modelo acompanha o marcador.');
        }
        break;
      case 'ar:marker-lost': setFound(false); setStatus('Marcador perdido. Mantenha a folha plana e o quadrado inteiro no enquadramento.'); break;
      case 'ar:model-loaded': if (!found) setStatus('Modelo pronto. Procurando o marcador da folha…'); break;
      case 'ar:camera-denied': setError(true); setStatus('Câmera bloqueada. Autorize a câmera no ícone de permissões do navegador e tente novamente.'); break;
      case 'ar:camera-error':
        setError(true); setStatus(m.payload?.code === 'NotFoundError' ? 'Não encontramos uma câmera neste aparelho.' : m.payload?.code === 'unsupported' ? 'Este navegador não oferece câmera/WebGL. Use um navegador compatível com HTTPS.' : 'Não foi possível iniciar a câmera. Feche outros aplicativos que a estejam usando e tente novamente.');
        break;
      case 'ar:model-error': setError(true); setStatus('O modelo não carregou. Verifique sua conexão e tente novamente.'); break;
    }
  }
  function zoom(delta: number) {
    scale.current = Math.max(.5, Math.min(3, scale.current + delta));
    sendARMessage(target.current, 'ar:set-scale', { scale: scale.current });
  }
  return <main className="ar-page">
    <div className="ar-heading"><Link className="back-link" to="/mapa">← Voltar ao mapa</Link><h1>{c.nome}<span>Realidade aumentada</span></h1></div>
    <div className={`ar-stage ${found ? 'recognized' : ''}`}>
      <ARFrame continent={c} session={session} onMessage={m => void message(m)} onWindow={w => { target.current = w; }} />
      <div className="ar-status" role={error ? 'alert' : 'status'}>{found ? '✓ ' : ''}{status}</div>
      {unlocked && <section className="ar-fact" aria-label="Ficha sobreposta do continente"><strong>{c.nome}</strong><p>{c.fichaCurta.localizacao}</p><p>{c.fichaCurta.curiosidade}</p></section>}
      <div className="ar-exit"><Link className="button primary" to={`/continente/${c.id}`}>{unlocked ? 'Ver sem câmera' : 'Ver dica do QR'}</Link><Link className="button secondary" to="/mapa">Voltar ao mapa</Link></div>
    </div>
    <div className="ar-toolbar" role="group" aria-label="Controles do modelo em realidade aumentada">
      <button onClick={() => zoom(.25)} aria-label="Ampliar modelo">＋ Ampliar</button><button onClick={() => zoom(-.25)} aria-label="Reduzir modelo">− Reduzir</button>
      <button onClick={() => sendARMessage(target.current, 'ar:rotate', { degrees: 30 })}>Girar</button>
      <button onClick={() => { scale.current = 1; sendARMessage(target.current, 'ar:reset'); }}>Restaurar</button>
    </div>
    <div className="ar-summary">
      <p className="micro">Boa iluminação · folha plana · sem reflexos · marcador inteiro no enquadramento</p>
      {error && !unlocked && <div className="camera-help"><img className="guide-image" src={asset(c.dicaQr?.imagem || 'images/guia-qr.svg')} alt="Procure a folha: o QR fica ao lado do marcador preto" /><p>{c.dicaQr?.texto}</p><p>Para estudar sem câmera, descubra primeiro este continente. Se a câmera não abrir, volte ao mapa ou peça ajuda ao professor.</p></div>}
      <div className="actions">
        {unlocked && <Link className="button primary" to={`/continente/${c.id}`}>{error ? 'Ver em 3D sem câmera' : 'Ver sem câmera'}</Link>}
        {error && <button className="button secondary" onClick={() => { scale.current = 1; setFound(false); setError(false); setSession(n => n + 1); setStatus('Reiniciando a câmera…'); }}>Tentar novamente</button>}
        <Link className="button secondary" to="/mapa">Minha coleção</Link>
      </div>
      <details><summary>Precisa de ajuda com a câmera?</summary><p>Se a câmera não abrir aqui, tente a realidade aumentada em uma página inteira.</p><a className="button secondary" href={`${asset('ar/scene.html')}?continente=${c.id}&model=${encodeURIComponent(c.modelo.arquivo)}&full=1`}>Abrir RA em página inteira</a></details>
    </div>
  </main>;
}
