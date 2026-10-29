import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp, safePreference } from './hooks/useApp';
import { Navigation } from './components/Navigation';
import { continentFromURL } from './services/discovery';
const Home=lazy(()=>import('./pages/Home'));
const Orientation=lazy(()=>import('./pages/Orientation'));
const Collection=lazy(()=>import('./pages/Collection'));
const Continent=lazy(()=>import('./pages/Continent'));
const QRScanner=lazy(()=>import('./pages/QRScanner'));
const ARExperience=lazy(()=>import('./pages/ARExperience'));
const Countries=lazy(()=>import('./pages/Countries'));
const Activity=lazy(()=>import('./pages/Activity'));
const Completion=lazy(()=>import('./pages/Completion'));
const Settings=lazy(()=>import('./pages/Settings'));
const Organizer=lazy(()=>import('./pages/Organizer'));
function Shell(){
 const app=useApp(),navigate=useNavigate(),location=useLocation();
 useEffect(()=>{const id=continentFromURL(window.location.search);if(id&&!window.location.hash)navigate(`/continente/${id}`,{replace:true});},[]);
 useEffect(()=>{window.scrollTo(0,0);document.getElementById('content')?.focus({preventScroll:true});},[location.pathname]);
 return <>
  <a className="skip-link" href="#content">Pular para o conteúdo</a><Navigation/>
  {app.warning&&<div className="global-warning" role="status">{app.warning}</div>}
  <div id="content" tabIndex={-1}><Suspense fallback={<main><p role="status">Preparando sua viagem…</p></main>}>
   {app.ready?<Routes>
    <Route path="/" element={<Home/>}/><Route path="/orientacao" element={<Orientation/>}/>
    <Route path="/mapa" element={safePreference('exploradores:intro:v1')?<Collection/>:<Navigate to="/orientacao" replace/>}/><Route path="/continente/:id" element={<Continent/>}/>
    <Route path="/qr/:id" element={<QRScanner/>}/><Route path="/ar/:id" element={<ARExperience/>}/>
    <Route path="/paises/:id" element={<Countries/>}/><Route path="/paises/:id/:countryId" element={<Countries/>}/>
    <Route path="/atividade/:id" element={<Activity/>}/><Route path="/conclusao" element={<Completion/>}/>
    <Route path="/configuracoes" element={<Settings/>}/>
    <Route path="/organizador" element={<Organizer/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
   </Routes>:<main><p role="status">Carregando seu progresso…</p></main>}
  </Suspense></div>
  <footer className="site-footer"><span>✦ Exploradores do Mundo</span><span>Aprender é descobrir, um continente de cada vez.</span><a href={`${import.meta.env.BASE_URL}fontes.html`} target="_blank" rel="noopener noreferrer">Fontes e licenças ↗</a></footer>
 </>;
}
export default function App(){return <AppProvider><HashRouter><Shell/></HashRouter></AppProvider>;}
