import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Activity, Continent, ContinentId, SchoolYear } from '../types/continent';
import { LocalStorageRepository } from '../services/collectionRepository';
import { StaticContentRepository, baseContinents } from '../services/contentRepository';
import { applyOverrides } from '../services/contentRepository';
import type { ContentOverrides } from '../services/contentSchema';
export const repository=new LocalStorageRepository();
interface AppState {continents:Continent[];activities:Activity[];unlocked:ContinentId[];completed:string[];year:SchoolYear;ready:boolean;warning:string;refresh:()=>Promise<void>;setYear:(year:SchoolYear)=>Promise<void>;previewDraft:(draft:ContentOverrides)=>void}
const AppContext=createContext<AppState|null>(null);
export function AppProvider({children}:{children:ReactNode}){
 const [content,setContent]=useState<{continents:Continent[];activities:Activity[]}>({continents:baseContinents,activities:[]});
 const [unlocked,setUnlocked]=useState<ContinentId[]>([]),[completed,setCompleted]=useState<string[]>([]),[year,saveYear]=useState<SchoolYear>('geral'),[ready,setReady]=useState(false),[warning,setWarning]=useState('');
 const refresh=useCallback(async()=>{const [u,a,p]=await Promise.all([repository.getUnlocked(),repository.getCompletedActivities(),repository.getProfile()]);setUnlocked(u);setCompleted(a);saveYear(p.anoEscolar||'geral');if(!repository.isPersistent)setWarning('Seu progresso não será salvo ao fechar este navegador.');},[]);
 useEffect(()=>{void new StaticContentRepository().load().then(async c=>{setContent(c);if(c.warning)setWarning(c.warning);await refresh();setReady(true);});const storage=()=>void refresh();window.addEventListener('storage',storage);return()=>window.removeEventListener('storage',storage);},[refresh]);
 return <AppContext.Provider value={{...content,unlocked,completed,year,ready,warning,refresh,setYear:async y=>{await repository.setProfile({anoEscolar:y});saveYear(y);},previewDraft:d=>{setContent(applyOverrides(baseContinents,d));}}}>{children}</AppContext.Provider>;
}
export function useApp(){const context=useContext(AppContext);if(!context)throw new Error('AppProvider ausente');return context;}
export { safePreference } from '../services/preferences';
