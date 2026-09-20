import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createPerformanceWheel } from './wheel-model.js';
const canvas=document.querySelector('#wheel');
const section=document.querySelector('.experience');
const stage=document.querySelector('.stage');
const opening=document.querySelector('.opening');
const engineering=document.querySelector('.engineering');
const studio=document.querySelector('.studio');
const toggle=document.querySelector('#motion-toggle');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const clamp=THREE.MathUtils.clamp;
let paused=reduced.matches,dragging=false,dragX=0,dragAngle=0,scrollP=0,visible=true;
const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('visible',e.isIntersecting)),{threshold:.12});
if(!reduced.matches)document.documentElement.classList.add('js-motion');
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
function updateButton(){toggle.setAttribute('aria-pressed',String(paused));toggle.innerHTML=paused?'Beweging hervatten <span>▷</span>':'Beweging pauzeren <span>Ⅱ</span>'}
updateButton();
toggle.addEventListener('click',()=>{paused=!paused;updateButton()});
reduced.addEventListener('change',()=>{paused=reduced.matches;updateButton();document.documentElement.classList.toggle('js-motion',!reduced.matches);if(reduced.matches){opening.style.opacity='1';opening.style.transform='none';engineering.style.opacity='0';studio.style.opacity='.6';}});
const viewObserver=new IntersectionObserver(([entry])=>visible=entry.isIntersecting,{rootMargin:'80px'});viewObserver.observe(section);
function progress(){document.querySelector('.header').classList.toggle('scrolled',scrollY>30);scrollP=reduced.matches?0:clamp(-section.getBoundingClientRect().top/(section.offsetHeight-innerHeight),0,1);stage.style.setProperty('--p',scrollP.toFixed(3));}
addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress,{passive:true});progress();
try {
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,0,6.6);
 const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();scene.environment=pmrem.fromScene(room,.05).texture;room.dispose();pmrem.dispose();scene.environmentIntensity=.7;
 scene.add(new THREE.AmbientLight(0xaac6c3,.2));
 const key=new THREE.DirectionalLight(0xf7f5e7,2.2);key.position.set(-4,6,5);scene.add(key);
 const fill=new THREE.DirectionalLight(0xb2cbdc,1.1);fill.position.set(5,1,2);scene.add(fill);
 const rimLight=new THREE.PointLight(0xff591d,38,12,2);rimLight.position.set(3,0,-2);scene.add(rimLight);
 const {root,tire,rim,brake}=createPerformanceWheel();scene.add(root);
 function size(){const box=canvas.parentElement.getBoundingClientRect();renderer.setSize(box.width,box.height,false);camera.aspect=box.width/box.height;camera.updateProjectionMatrix();camera.position.z=innerWidth<700?6.35:innerWidth<900?8.8:innerWidth<1100?7.7:6.15;}
 const resize=new ResizeObserver(size);resize.observe(canvas.parentElement);size();
 canvas.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;dragging=true;dragX=e.clientX;canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(dragging){dragAngle=clamp(dragAngle+(e.clientX-dragX)*.006,-.8,.8);dragX=e.clientX}});
 canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointercancel',()=>dragging=false);
 let previous=0,angle=0,lastP=-1;const smooth=x=>x*x*(3-2*x);
 renderer.setAnimationLoop(time=>{
   const dt=Math.min((time-previous)/1000,.05);previous=time;if(!visible||document.hidden)return;
   const p=reduced.matches?0:paused?Math.max(lastP,0):scrollP;
   const transition=smooth(clamp((p-.05)/.45,0,1));const exploded=smooth(clamp((p-.2)/.65,0,1));
   if(!paused&&!reduced.matches)angle+=dt*.075;
   tire.rotation.z=angle;rim.rotation.z=angle;
   root.rotation.y=-.43-exploded*.62+dragAngle;root.rotation.x=.09+exploded*.08;root.rotation.z=-.07+exploded*.04;
   tire.position.z=-exploded*1.05;rim.position.z=exploded*1.15;brake.position.z=0;
   const sc=1-exploded*(innerWidth<700?.29:.16);root.scale.setScalar(sc);
   root.position.x=innerWidth<700?exploded*.08:-exploded*.45;root.position.y=0;canvas.parentElement.style.top=innerWidth<700?(22+exploded*18)+'%':'';
   rimLight.position.x=3+Math.sin(angle*2)*1.5;
   if(p!==lastP){opening.style.opacity=String(1-transition);opening.style.transform=`translateY(${-transition*45}px)`;opening.style.visibility=transition>.99?'hidden':'visible';engineering.style.opacity=String(transition);engineering.style.transform=`translateY(${(1-transition)*35}px)`;engineering.setAttribute('aria-hidden',String(transition<.5));studio.style.opacity=String(.6-transition*.48);lastP=p;}
   renderer.render(scene,camera);
 });
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();toggle.hidden=true;canvas.hidden=true;});
} catch(error) {
 console.warn('3D preview unavailable; website navigation remains available.');
 toggle.hidden=true;canvas.hidden=true;document.querySelector('.drag-hint').hidden=true;
 section.style.height='100svh';stage.style.position='relative';
}
