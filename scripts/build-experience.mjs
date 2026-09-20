import {build} from 'esbuild';
import {copyFile,mkdir} from 'node:fs/promises';
await mkdir('docs/experience',{recursive:true});
await build({entryPoints:['source/experience/experience.js'],outfile:'docs/experience/experience.js',bundle:true,format:'esm',minify:true,target:'es2022',legalComments:'eof'});
for(const f of ['index.html','experience.css','studio.png'])await copyFile('source/experience/'+f,'docs/experience/'+f);
console.log('Interactive night concept built.');
