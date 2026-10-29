import { useSyncExternalStore } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isOrganizerSession, setOrganizerSession, subscribeOrganizerSession } from '../services/organizerSession';
import { InterfaceIcon } from './InterfaceIcon';

export function Navigation({ publicView = false }: { publicView?: boolean }) {
  const { pathname } = useLocation(), navigate = useNavigate();
  const preview = useSyncExternalStore(subscribeOrganizerSession, isOrganizerSession, () => false);
  const camera = pathname.startsWith('/ar/') || pathname.startsWith('/qr/');
  return <header className={`site-header ${camera ? 'camera-header' : ''}`}>
    <Link className="brand" to="/" aria-label="Exploradores do Mundo, início"><span className="brand-icon"><InterfaceIcon name="compass" /></span><span>exploradores<span className="brand-sub">do mundo</span></span></Link>
    <nav aria-label="Principal">
      <Link to="/" aria-current={pathname === '/' ? 'page' : undefined}><InterfaceIcon name="home" /><span>Início</span></Link>
      <Link to="/mapa" aria-current={pathname === '/mapa' ? 'page' : undefined}><InterfaceIcon name="map" /><span>Meu mapa</span></Link>
      <Link to="/configuracoes" aria-current={pathname === '/configuracoes' ? 'page' : undefined}><InterfaceIcon name="settings" /><span>Configurações</span></Link>
    </nav>
    {preview && !publicView && <button className="button secondary admin-exit" onClick={() => { setOrganizerSession(false); navigate('/'); }}>Sair do ADM</button>}
  </header>;
}
