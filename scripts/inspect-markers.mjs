import { PNG } from 'pngjs';
import { readFile } from 'node:fs/promises';
for(let id=0;id<6;id++){
 const r=await fetch(`https://raw.githubusercontent.com/nicolocarpignoli/artoolkit-barcode-markers-collection/master/3x3/${id}.png`);
 const p=PNG.sync.read(Buffer.from(await r.arrayBuffer()));
 let cells=[];for(let y=0;y<3;y++){let row=[];for(let x=0;x<3;x++){const xx=Math.floor(p.width*(0.25+(x+0.5)/6)),yy=Math.floor(p.height*(0.25+(y+0.5)/6));row.push(p.data[(yy*p.width+xx)*4]<128?1:0);}cells.push(row);}console.log(id,p.width,p.height,JSON.stringify(cells));
}
const geo=JSON.parse(await readFile('data-src/geo/ne_50m_admin_0_countries.geojson','utf8'));
console.log('unusual continents',geo.features.filter(f=>!['Africa','Asia','Europe','North America','South America','Oceania','Antarctica'].includes(f.properties.CONTINENT)).map(f=>[f.properties.ADM0_A3,f.properties.CONTINENT]));
console.log('capitals sample',JSON.parse(await readFile('data-src/geo/ne_50m_populated_places_simple.geojson','utf8')).features[0].properties);
