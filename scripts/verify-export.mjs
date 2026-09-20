import {readdir,readFile,stat} from 'node:fs/promises';
import {load} from 'cheerio';
import path from 'node:path';
async function files(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(x=>x.isDirectory()?files(path.join(dir,x.name)):path.join(dir,x.name)))).flat()}
const pages=(await files('docs')).filter(x=>x.endsWith('.html'));const failures=[];let links=0;
for(const file of pages){const $=load(await readFile(file,'utf8'));for(const el of $('[href],[src]').toArray()){for(const attr of ['href','src']){const value=$(el).attr(attr);if(!value?.startsWith('/ar-cars/'))continue;links++;let target='docs/'+decodeURIComponent(value.slice('/ar-cars/'.length).split(/[?#]/)[0]);if(target.endsWith('/'))target+='index.html';try{const info=await stat(target);if(info.isDirectory())await stat(path.join(target,'index.html'));}catch{failures.push(file+': '+value)}}}
if(!file.endsWith('404.html')&&!$('meta[http-equiv="refresh"]').length){if($('h1').length!==1)failures.push(file+': expected one H1');if($('.site-header .logo').attr('href')!=='/ar-cars/')failures.push(file+': incorrect home link');}}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}console.log(`Verified ${pages.length} pages and ${links} local links/assets. All shared logos return to the premium homepage.`);
