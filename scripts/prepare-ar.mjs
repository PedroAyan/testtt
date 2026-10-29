import { build } from 'esbuild';
await build({entryPoints:['src/services/arStandalone.ts'],outfile:'public/ar/domain.js',bundle:true,platform:'browser',format:'esm',target:'es2022',minify:true});
