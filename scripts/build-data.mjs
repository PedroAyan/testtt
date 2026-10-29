import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { META, IMPLEMENTED_CONTINENTS } from './config.mjs';
import { editorial } from '../data-src/editorial.mjs';

const json = async path => JSON.parse(await readFile(path, 'utf8'));
const geo = await json('data-src/geo/ne_50m_admin_0_countries.geojson');
const places = await json('data-src/geo/ne_50m_populated_places_simple.geojson');
const html = await readFile('data-src/un-members.html', 'utf8');
const clean = text => text.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
const names = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(x => clean(x[1])).filter(x=>x && x !== 'Search the United Nations');
const normalize = text => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z]/g, '');
const aliases = {
  'Bahamas (The)': 'BHS', 'Brunei Darussalam': 'BRN', 'Bolivia (Plurinational State of)': 'BOL',
  "China (the People's Republic of)": 'CHN', 'Congo': 'COG', "Côte D'Ivoire": 'CIV', 'Czechia': 'CZE',
  "Democratic People's Republic of Korea": 'PRK', 'Gambia (Republic of The)': 'GMB', 'Guinea Bissau': 'GNB',
  'Iran (Islamic Republic of)': 'IRN', 'Lao People’s Democratic Republic': 'LAO',
  'Micronesia (Federated States of)': 'FSM', 'Naoero': 'NRU', 'Netherlands (Kingdom of the)': 'NLD',
  'Republic of Korea': 'KOR', 'Republic of Moldova': 'MDA', 'Russian Federation': 'RUS',
  'United Kingdom of Great Britain and Northern Ireland': 'GBR', 'United Republic of Tanzania': 'TZA',
  'Venezuela, Bolivarian Republic of': 'VEN', 'Viet Nam': 'VNM', 'Timor-Leste': 'TLS', 'Cabo Verde': 'CPV',
  'Türkiye': 'TUR', 'Türkiye (Republic of)': 'TUR',
};
const unmatched = [];
const memberCodes = names.map(name => {
  const match = geo.features.find(f => ['NAME_EN', 'ADMIN', 'FORMAL_EN', 'NAME_LONG'].some(k => f.properties[k] && normalize(f.properties[k]) === normalize(name)));
  const code = aliases[name] || match?.properties.ADM0_A3;
  if (!code) unmatched.push(name);
  return code;
});
if (memberCodes.length !== 193 || unmatched.length || new Set(memberCodes).size !== 193) {
  throw new Error(`ONU: ${names.length} entradas, ${new Set(memberCodes).size} códigos; sem correspondência: ${JSON.stringify(unmatched)}`);
}
const observers = await readFile('data-src/un-observers.html', 'utf8');
if (!/Holy See/i.test(observers) || !/Palestine/i.test(observers)) throw new Error('Revalidar observadores ONU.');
const sovereigns = new Set([...memberCodes, 'VAT', 'PSX']);
await writeFile('data-src/un-sovereign-codes.json', JSON.stringify([...sovereigns].sort(), null, 2) + '\n');
const byContinent = { Africa:'africa', 'North America':'america', 'South America':'america', Antarctica:'antartida', Asia:'asia', Europe:'europa', Oceania:'oceania' };
const overrides = { RUS:'asia', TUR:'asia', KAZ:'asia', GEO:'asia', ARM:'asia', AZE:'asia', CYP:'asia', EGY:'africa', SYC:'africa', MUS:'africa', MDV:'asia', SHN:'africa', IOT:'asia', SGS:'antartida', ATF:'antartida', HMD:'antartida' };
const transcontinental = {
  RUS:'A Rússia se estende pela Europa e pela Ásia; fica na Ásia nesta coleção pela maior parte do território.',
  TUR:'A Turquia tem terras na Europa e na Ásia; a maior parte fica na Ásia.',
  KAZ:'O Cazaquistão tem terras na Europa e na Ásia; a maior parte fica na Ásia.',
  EGY:'O Egito inclui a Península do Sinai, na Ásia; a maior parte de seu território fica na África.',
  GEO:'O limite entre Europa e Ásia no Cáucaso varia por convenção; esta coleção adota a Geórgia na Ásia.',
  AZE:'O limite entre Europa e Ásia no Cáucaso varia por convenção; esta coleção adota o Azerbaijão na Ásia.',
  ARM:'Esta coleção adota a Armênia na Ásia, conforme a região geográfica do Natural Earth.',
  IDN:'A Indonésia tem ilhas dos dois lados do limite convencional Ásia/Oceania; a maior parte do território fica na Ásia.',
};
const mapping = Object.fromEntries(geo.features.map(f => [f.properties.ADM0_A3, overrides[f.properties.ADM0_A3] || byContinent[f.properties.CONTINENT] || 'antartida']));
// O arquivo é versionado e passa a ser entrada explícita do pipeline de modelos.
await writeFile('data-src/country-continent.json', JSON.stringify(mapping, null, 2) + '\n');
const missing = { valor:null, fonte:'natural-earth', verificar:true };
const region = p => ({ 'South America':'América do Sul', 'Central America':'América Central', Caribbean:'Caribe' })[p.SUBREGION] || 'América do Norte';
function country(f, continentId) {
  const p = f.properties;
  const capitals = places.features.filter(x => Number(x.properties.adm0cap) === 1 && x.properties.adm0_a3 === p.ADM0_A3).map(x => x.properties.name);
  return {
    id:p.ADM0_A3, nome:p.NAME_PT || p.NAME_EN, nomeFonte:'natural-earth',
    ...(capitals.length ? { capital:{ valor:[...new Set(capitals)].join(' / '), fonte:'natural-earth' } } : {}),
    populacao: p.POP_EST > 0 && p.POP_YEAR > 0 ? { valor:p.POP_EST, fonte:'natural-earth', anoReferencia:p.POP_YEAR } : { ...missing, anoReferencia:0 },
    areaKm2:{ ...missing },
    curiosidade:`No mapa desta coleção, ${p.NAME_PT || p.NAME_EN} faz parte de ${META[continentId].nome}.`,
    fontes:['natural-earth', 'un-members'],
    ...(transcontinental[p.ADM0_A3] ? { nota:transcontinental[p.ADM0_A3] } : {}),
    ...(contintentRegion(continentId) ? { regiao:region(p) } : {}),
    modelo:{ arquivo:`models/countries/${p.ADM0_A3}.glb` },
  };
}
function contintentRegion(id) { return id === 'america'; }
await mkdir('src/data/continents', {recursive:true});
await mkdir('public/images', {recursive:true});
for (const id of IMPLEMENTED_CONTINENTS) {
  const e = editorial[id];
  const features = geo.features.filter(f => mapping[f.properties.ADM0_A3] === id && f.properties.ADM0_A3 !== 'ATA');
  const paises = id === 'antartida' ? [] : features.filter(f => sovereigns.has(f.properties.ADM0_A3)).map(f=>country(f,id)).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
  const territorios = id === 'antartida' ? [] : features.filter(f => !sovereigns.has(f.properties.ADM0_A3)).map(f=>({...country(f,id), nota:'Território, dependência ou área com status próprio/disputado; fora da contagem de Estados da ONU.'})).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
  const fontesTexto = Object.fromEntries(['descricao','caracteristicasGeograficas','climas','faunaFlora','cultura','curiosidades'].map(field=>[field,[e.fonte, ...(id==='antartida'?['antarctic-treaty']:[])]]));
  const data = {
    id, nome:META[id].nome, cor:META[id].cor, descricaoCurta:e.descricao, descricao:e.descricao,
    fichaCurta:{localizacao:e.localizacao,curiosidade:e.curiosidade,ilustracao:`images/${id}.svg`,ilustracaoAlt:`Ilustração educativa de ${META[id].nome}: ${e.curiosidade}`},
    areaKm2:{...missing}, populacao:{...missing,anoReferencia:0},
    quantidadePaises:{valor:paises.length,fonte:'un-members',criterio:'Estados-membros da ONU e observadores; país no continente da maior parte do território, Cáucaso na Ásia.'},
    caracteristicasGeograficas:e.caracteristicasGeograficas, climas:e.climas, faunaFlora:e.faunaFlora,cultura:e.cultura,curiosidades:[e.curiosidade],
    paises,territorios,fontesTexto,marcador:{tipo:'barcode',id:Object.keys(META).indexOf(id),arquivo:`markers/${id}-ar.svg`},modelo:{arquivo:`models/${id}.glb`},
    dicaQr:{texto:`Procure a folha com o título “${META[id].nome}”, preparada pelo professor. O QR fica ao lado do quadrado preto.`,imagem:'images/guia-qr.svg'},
    saibaMais:{texto:id==='america'?'Usamos o modelo de seis continentes, com a América unificada. Outros livros usam sete e separam América do Norte e América do Sul.':e.descricao,links:[{titulo:'Consultar a fonte',url: id==='antartida'?'https://www.ats.aq/e/antarctictreaty.html':`https://education.nationalgeographic.org/resource/${({africa:'africa-physical-geography',asia:'asia',europa:'europe-physical-geography',oceania:'oceania-physical-geography',america:'Continent'})[id]}/`}]},
  };
  await writeFile(`src/data/continents/${id}.json`, JSON.stringify(data,null,2)+'\n');
  const art = {
    sun:'<circle cx="250" cy="90" r="38" fill="#ffd166"/><path d="M10 190Q100 90 200 190T390 185V245H10Z" fill="#e7b66a"/><path d="M105 165v-65m-45 18q45-72 95 0Z" fill="#386956" stroke="#386956" stroke-width="8"/>',
    leaf:'<path d="M190 215V60m0 90Q60 160 82 80q90-20 108 70m0-25Q305 140 300 45q-90 0-110 80" stroke="#386956" stroke-width="10" fill="#a8e6cf"/>',
    snow:'<path d="m35 210 95-135 75 135 65-105 95 105Z" fill="#8ec3d7"/><path d="m86 137 44-62 35 62-36-18Z" fill="white"/><ellipse cx="260" cy="179" rx="23" ry="36" fill="#5c3a45"/><ellipse cx="260" cy="188" rx="15" ry="25" fill="white"/>',
    mountain:'<path d="m20 215 120-170 110 170 50-120 80 120Z" fill="#8e80c2"/><path d="m95 109 45-64 42 64-40-18Z" fill="white"/><circle cx="290" cy="56" r="22" fill="#ffd166"/>',
    river:'<path d="M0 160Q90 65 180 160t220-15v100H0Z" fill="#a8e6cf"/><path d="M240 130q-140 45-30 70t-50 45" stroke="#70adc8" stroke-width="30" fill="none"/><path d="m70 130 40-60 40 60Z" fill="#386956"/>',
    wave:'<path d="M0 150q50-45 100 0t100 0t100 0t100 0v95H0Z" fill="#8ec3d7"/><path d="M150 180q50-60 110 0Z" fill="#ffd166"/><path d="M215 160V70m0 0q-45-50-70-10m70 10q45-50 70-10" stroke="#386956" stroke-width="9" fill="none"/>',
  }[e.icon];
  await writeFile(`public/images/${id}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" rx="24" fill="#fff8ed"/>${art}</svg>`);
  console.log(`${id}: ${paises.length} países; ${territorios.length} territórios/áreas`);
}
await writeFile('public/images/guia-qr.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240"><rect x="35" y="10" width="330" height="220" rx="12" fill="white" stroke="#5c3a45" stroke-width="3"/><text x="200" y="48" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#5c3a45">Folha do continente</text><rect x="70" y="80" width="95" height="95" fill="white" stroke="#5c3a45" stroke-width="8"/><text x="117" y="140" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#5c3a45">QR</text><rect x="220" y="80" width="100" height="100" fill="black"/><rect x="245" y="105" width="50" height="50" fill="white"/><path d="m80 210 35-30 35 30" fill="none" stroke="#9d3156" stroke-width="5"/></svg>');
