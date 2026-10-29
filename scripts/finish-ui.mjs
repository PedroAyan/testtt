import { readFile, writeFile } from 'node:fs/promises';
const home='src/pages/Home.tsx';let h=await readFile(home,'utf8');h=h.replace("import { useApp }", "import { useApp, safePreference }");h=h.replace('to="/orientacao"', 'to={safePreference(\'exploradores:intro:v1\')?\'/mapa\':\'/orientacao\'}');await writeFile(home,h);
const activity='src/pages/Activity.tsx';let a=await readFile(activity,'utf8');a=a.replace('useApp().continents.map','app.continents.map').replaceAll('useName(', 'continentName(').replace('const useName=', 'const continentName=');await writeFile(activity,a);
