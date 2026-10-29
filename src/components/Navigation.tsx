import { useEffect, useState, useSyncExternalStore } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isOrganizerSession, setOrganizerSession, subscribeOrganizerSession } from '../services/organizerSession';
import { InterfaceIcon } from './InterfaceIcon';

export function Navigation({ publicView = false }: { publicView?: boolean }) {
  const { pathname } = useLocation(), navigate = useNavigate();
  const preview = useSyncExternalStore(subscribeOrganizerSession, isOrganizerSession, () => false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;
    // O limite acompanha o tamanho real do texto, inclusive a ampliação do usuário.
    const fit = () => setExpanded(root.clientWidth / parseFloat(getComputedStyle(document.documentElement).fontSize) < 18);
    const observer = new ResizeObserver(fit);
    observer.observe(root);
    window.addEventListener('resize', fit);
    fit();
    return () => { observer.disconnect(); window.removeEventListener('resize', fit); };
  }, []);
  const camera = pathname.startsWith('/ar/') || pathname.startsWith('/qr/');
  const inMap = ['/mapa', '/continente/', '/paises/', '/atividade/', '/conclusao', '/ar/', '/qr/'].some(path => pathname.startsWith(path));
  return <header className={`site-header ${camera ? 'camera-header' : ''}`}>
    <Link className="brand" to="/" aria-label="Exploradores do Mundo, início"><span className="brand-icon"><InterfaceIcon name="compass" /></span><span>exploradores<span className="brand-sub">do mundo</span></span></Link>
    <Link className="header-help" to="/orientacao" aria-label="Como jogar"><InterfaceIcon name="book" /></Link>
    <nav className={expanded ? 'expanded-nav' : undefined} aria-label="Principal">
      <Link to="/" aria-current={pathname === '/' ? 'page' : undefined}><InterfaceIcon name="home" /><span>Início</span></Link>
      <Link to="/mapa" aria-current={inMap ? 'page' : undefined}><InterfaceIcon name="map" /><span>Meu mapa</span></Link>
      <Link to="/configuracoes" aria-current={pathname === '/configuracoes' ? 'page' : undefined}><InterfaceIcon name="settings" /><span>Configurações</span></Link>
    </nav>
    {preview && !publicView && <button className="button secondary admin-exit" onClick={() => { setOrganizerSession(false); navigate('/'); }}>Sair do ADM</button>}
  </header>;
}
