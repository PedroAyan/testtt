import { validateOverrides, type ContentOverrides } from './contentSchema';
export const emptyOverrides=():ContentOverrides=>({version:1,continents:{},countries:{},activities:[]});
const key='exploradores:organizer:v1';
export function loadDraft(sources:string[]):{draft:ContentOverrides;warning?:string}{
 try{const text=localStorage.getItem(key);if(!text)return {draft:emptyOverrides()};const draft=validateOverrides(JSON.parse(text),sources);return draft?{draft}:{draft:emptyOverrides(),warning:'O rascunho salvo era inválido e foi ignorado.'};}
 catch{return {draft:emptyOverrides(),warning:'O navegador não permite guardar o rascunho local.'};}
}
export function saveDraft(draft:ContentOverrides){try{localStorage.setItem(key,JSON.stringify(draft));return true;}catch{return false;}}
export function exportDraft(draft:ContentOverrides){const url=URL.createObjectURL(new Blob([JSON.stringify(draft,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='content-overrides.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
