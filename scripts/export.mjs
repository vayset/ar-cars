import { load } from 'cheerio';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { company, services, articles, commonFaq } from '../source/content.mjs';

const origin = company.origin;
const sourceOrigin = process.env.SOURCE_ORIGIN || origin;
const base = '/ar-cars';
const out = path.resolve('docs');
const routes = ['/', '/garage', '/over-ons', '/advies', '/veelgestelde-vragen', '/privacy', '/cookies', '/bedrijfsgegevens', '/beeldcredits', ...services.map(s=>'/garage/'+s.slug), ...articles.map(a=>'/advies/'+a.slug)];
const routeSet = new Set(routes);
const faqs = new Map([...commonFaq, ...services.flatMap(s=>s.faq)]);
const pendingAssets = new Map();
const localPath = p => `${base}${p === '/' ? '/' : p + '/'}`;
async function save(rel, data) {
  const target = path.join(out, rel);
  if (!target.startsWith(out + path.sep)) throw Error('Invalid output path');
  await mkdir(path.dirname(target), {recursive:true});
  await writeFile(target, data);
}
async function read(url) {
  const response = await fetch(url);
  if (!response.ok) throw Error(`${response.status}: ${url}`);
  return response;
}
function asset(value) {
  if (!value || /^(data:|#)/.test(value)) return value;
  const u = new URL(value, origin);
  if (u.origin !== origin) return value;
  if (!/^\/(images|fonts|premium|_next\/static)\//.test(u.pathname) && u.pathname !== '/favicon.svg') throw Error('Unexpected asset '+u.pathname);
  if (!pendingAssets.has(u.pathname)) pendingAssets.set(u.pathname, null);
  return base + u.pathname;
}
function link(value) {
  if (!value || /^(#|tel:|mailto:)/.test(value)) return value;
  const u = new URL(value, origin);
  if (u.origin !== origin) return value;
  const p = u.pathname.replace(/\/$/,'') || '/';
  return routeSet.has(p) ? localPath(p)+u.search+u.hash : u.href;
}
await rm(out,{recursive:true,force:true});
for (const route of routes) {
  const $ = load(await (await read(sourceOrigin+route)).text());
  if ($('h1').length !== 1) throw Error('Missing page content: '+route);
  $('script').not('[type="application/ld+json"],script[type="module"][src^="/premium/"]').remove();
  const motion=$('main[data-motion-src]').attr('data-motion-src');
  if(motion) $('body').append($('<script type="module">').attr('src',motion));
  $('script[src]').each((i,el)=>$(el).attr('src',asset($(el).attr('src'))));
  $('link[rel="modulepreload"],link[rel="preload"][as="script"]').remove();
  $('[data-slot="accordion-item"]').each((i,el)=>{
    const item = $(el), button = item.find('button'), content = item.find('[role="region"]');
    const answer = faqs.get(button.text().trim());
    if (!answer) throw Error('Missing FAQ answer: '+button.text());
    content.empty().append($('<p>').text(answer));
    button.attr('aria-controls',content.attr('id'));
  });
  $('form').each((i,el)=>{
    $(el).replaceWith($('<div class="lead-form">').append('<h3>Waarmee kunnen we u helpen?</h3>').append('<p>Vertel ons wat uw auto nodig heeft. Artur neemt uw aanvraag persoonlijk in behandeling.</p>').append($('<a class="button dark">').attr('href',origin+'/contact').text('Vraag een afspraak aan')));
  });
  $('a[href]').each((i,el)=>$(el).attr('href',link($(el).attr('href'))));
  $('img[src]').each((i,el)=>$(el).attr('src',asset($(el).attr('src'))));
  $('[srcset],[imagesrcset]').each((i,el)=>{
    for (const key of ['srcset','imagesrcset']) {
      const value=$(el).attr(key);
      if(value) $(el).attr(key,value.split(',').map(part=>{const [u,...rest]=part.trim().split(/\s+/);return [asset(u),...rest].join(' ')}).join(', '));
    }
  });
  $('link[rel="stylesheet"],link[rel="icon"],link[rel="preload"]').each((i,el)=>$(el).attr('href',asset($(el).attr('href'))));
  if(route==='/privacy') {
    const target=$('p').filter((i,el)=>$(el).text().includes('De website gebruikt'));
    target.append(' Deze publieke informatiepagina’s worden ook via GitHub Pages gehost. Het actuele autoaanbod, contactformulieren en beheer blijven op de oorspronkelijke website.');
  }
  $('head').append(`<link rel="stylesheet" href="${base}/pages.css"><script src="${base}/pages.js" defer></script>`);
  await save(route==='/'?'index.html':route.slice(1)+'/index.html',$.html());
  console.log('Exported '+route);
}
asset('/fonts/OFL-Barlow.txt');
asset('/fonts/OFL-BarlowCondensed.txt');
for (const [pathname] of pendingAssets) {
  const response=await read(sourceOrigin+pathname);
  if(pathname.endsWith('.css')) {
    let css=await response.text();
    css=css.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g,(match,quote,value)=>{
      if(value.startsWith('data:')||value.startsWith('#')) return match;
      const absolute=new URL(value,origin+pathname);
      return `url("${asset(absolute.href)}")`;
    });
    await save(pathname.slice(1),css);
  } else await save(pathname.slice(1),Buffer.from(await response.arrayBuffer()));
}
for(const route of ['/autos','/contact','/beheer']) {
  const url=origin+route;
  await save(route.slice(1)+'/index.html',`<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>A.R. Cars</title><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${url}"><link rel="canonical" href="${url}"></head><body><p><a href="${url}">Ga verder op de website van A.R. Cars</a></p></body></html>`);
}
await save('pages.js',`document.querySelectorAll('[data-slot="accordion-trigger"]').forEach(button=>button.addEventListener('click',()=>{const content=document.getElementById(button.getAttribute('aria-controls'));const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.dataset.state=open?'open':'closed';content.hidden=!open;content.dataset.state=open?'open':'closed';}));
const consent=document.querySelector('.consent-settings');if(consent){const inputs=consent.querySelectorAll('input');try{const choice=JSON.parse(localStorage.getItem('ar-consent')||'{}');inputs[1].checked=!!choice.analytics;inputs[2].checked=!!choice.marketing;}catch{}consent.querySelectorAll('button').forEach((button,index)=>button.addEventListener('click',()=>{if(index===1){inputs[1].checked=false;inputs[2].checked=false;}let message='Uw voorkeuren zijn opgeslagen.';try{localStorage.setItem('ar-consent',JSON.stringify({analytics:inputs[1].checked,marketing:inputs[2].checked}));}catch{message='Opslaan is niet beschikbaar in deze browser. Er worden geen analyse- of advertentiescripts geladen.';}let status=consent.querySelector('[role="status"]');if(!status){status=document.createElement('p');status.setAttribute('role','status');consent.append(status);}status.textContent=message;}));}`);
await save('pages.css','[data-slot="accordion-content"][hidden]{display:none!important}[data-slot="accordion-content"] p{padding:0 0 1.2rem}.lead-form .button{margin-top:1rem}');
await save('.nojekyll','');
await save('experience/index.html',`<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="0;url=${base}/"><link rel="canonical" href="https://vayset.github.io${base}/"><title>A.R. Cars</title></head><body><a href="${base}/">Ontdek de volledige website van A.R. Cars</a></body></html>`);
await save('robots.txt',`User-agent: *\nAllow: /\n# Canonical business website: ${origin}\n`);
await save('404.html',`<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Pagina niet gevonden | A.R. Cars</title><style>body{background:#131716;color:#fff;font:18px system-ui;padding:10vw}a{color:#ff7c32}</style></head><body><h1>Deze pagina bestaat niet.</h1><p><a href="${base}/">Terug naar A.R. Cars</a></p></body></html>`);
console.log(`Done: ${routes.length} pages, ${pendingAssets.size} assets. Dynamic services stay at ${origin}.`);
