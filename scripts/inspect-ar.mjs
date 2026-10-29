import { readFile } from 'node:fs/promises';
const s=await readFile('public/vendor/ar-3.4.7.js','utf8');
for(const pattern of [/registerSystem\(.{0,80}/g,/registerComponent\(.{0,80}/g,/.{0,80}camera-error.{0,100}/g,/.{0,80}camera-init.{0,100}/g,/.{0,60}_arSession.{0,100}/g])console.log([...s.matchAll(pattern)].map(x=>x[0]).slice(-12).join('\n'));
