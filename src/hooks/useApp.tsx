import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import type { Activity, Continent, ContinentId, SchoolYear } from '../types/continent';
import { CONTINENT_IDS } from '../types/continent';
import { LocalStorageRepository } from '../services/collectionRepository';
import { StaticContentRepository, baseContinents } from '../services/contentRepository';
import { applyOverrides } from '../services/contentRepository';
import type { ContentOverrides } from '../services/contentSchema';
import { isOrganizerSession, subscribeOrganizerSession } from '../services/organizerSession';
import { adminProgress } from '../services/adminProgress';
export const repository=new LocalStorageRepository();
interface AppState {continents:Continent[];activities:Activity[];unlocked:ContinentId[];completed:string[];year:SchoolYear;ready:boolean;warning:string;organizerPreview:boolean;refresh:()=>Promise<void>;setYear:(year:SchoolYear)=>Promise<void>;previewDraft:(draft:ContentOverrides)=>void}
const AppContext=createContext<AppState|null>(null);
export function AppProvider({children}:{children:ReactNode}){
 const organizerPreview=useSyncExternalStore(subscribeOrganizerSession,isOrganizerSession,()=>false);
 const [content,setContent]=useState<{continents:Continent[];activities:Activity[]}>({continents:baseContinents,activities:[]});
 const [unlocked,setUnlocked]=useState<ContinentId[]>([]),[completed,setCompleted]=useState<string[]>([]),[year,saveYear]=useState<SchoolYear>('geral'),[ready,setReady]=useState(false),[warning,setWarning]=useState('');
 const refresh=useCallback(async()=>{const current=organizerPreview?adminProgress:repository;const [saved,activities,profile]=await Promise.all([current.getUnlocked(),current.getCompletedActivities(),current.getProfile()]);setUnlocked(organizerPreview?[...CONTINENT_IDS]:saved);setCompleted(activities);saveYear(profile.anoEscolar||'geral');if(!repository.isPersistent)setWarning('Seu progresso não será salvo ao fechar este navegador.');},[organizerPreview]);
 useEffect(()=>{void new StaticContentRepository().load().then(async c=>{setContent(c);if(c.warning)setWarning(c.warning);await refresh();setReady(true);});const storage=()=>void refresh();window.addEventListener('storage',storage);const unsubscribe=subscribeOrganizerSession(()=>void refresh());return()=>{window.removeEventListener('storage',storage);unsubscribe();};},[refresh]);
 return <AppContext.Provider value={{...content,unlocked,completed,year,ready,warning,organizerPreview,refresh,setYear:async y=>{const current=isOrganizerSession()?adminProgress:repository;await current.setProfile({anoEscolar:y});saveYear(y);},previewDraft:d=>{setContent(applyOverrides(baseContinents,d));}}}>{children}</AppContext.Provider>;
}
export function useApp(){const context=useContext(AppContext);if(!context)throw new Error('AppProvider ausente');return context;}
export const activeCollectionRepository=()=>isOrganizerSession()?adminProgress:repository;
export { safePreference } from '../services/preferences';
