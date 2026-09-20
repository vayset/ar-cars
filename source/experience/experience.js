import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
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
 const rubber=new THREE.MeshStandardMaterial({color:0x060806,roughness:.9,metalness:0,envMapIntensity:.12});
 const treadMat=new THREE.MeshStandardMaterial({color:0x090d0b,roughness:.95,metalness:0,envMapIntensity:.1});
 const metal=new THREE.MeshStandardMaterial({color:0x858e90,metalness:1,roughness:.22});
 const bright=new THREE.MeshStandardMaterial({color:0xc7ced0,metalness:1,roughness:.17});
 const darkMetal=new THREE.MeshStandardMaterial({color:0x242b2c,metalness:.85,roughness:.32});
 const rotorMat=new THREE.MeshStandardMaterial({color:0x626b6c,metalness:.9,roughness:.4});
 const orange=new THREE.MeshPhysicalMaterial({color:0xec3506,metalness:.25,roughness:.34,clearcoat:.5,clearcoatRoughness:.3});
 const root=new THREE.Group();scene.add(root);
 const tire=new THREE.Group(),rim=new THREE.Group(),brake=new THREE.Group();root.add(tire,rim,brake);
 function mesh(geometry,material,parent,z=0){const m=new THREE.Mesh(geometry,material);m.position.z=z;parent.add(m);return m}
 function lathe(points,material,parent){const geo=new THREE.LatheGeometry(points.map(([r,z])=>new THREE.Vector2(r,z)),96);geo.rotateX(Math.PI/2);return mesh(geo,material,parent)}
 // Profile includes rounded shoulders, sidewalls, bead and an open center.
 lathe([[1.02,-.3],[1.09,-.35],[1.2,-.36],[1.34,-.29],[1.4,-.2],[1.42,-.11],[1.42,.11],[1.4,.2],[1.34,.29],[1.2,.36],[1.09,.35],[1.02,.3],[1.02,-.3]],rubber,tire);
 for(const z of [-.335,.335])for(const r of [1.08,1.12,1.27])mesh(new THREE.TorusGeometry(r,.009,6,96),treadMat,tire,z);
 // Hundreds of instanced rubber blocks create real relief without hundreds of draw calls.
 const treads=new THREE.InstancedMesh(new THREE.BoxGeometry(.047,.009,.125),treadMat,96*4);let count=0;const dummy=new THREE.Object3D();
 for(let i=0;i<96;i++)for(let j=0;j<4;j++){const a=i/96*Math.PI*2+(j%2)*.024;dummy.position.set(Math.cos(a)*1.414,Math.sin(a)*1.414,(j-1.5)*.115);dummy.rotation.set(0,0,a-Math.PI/2);dummy.rotateY(j<2?.3:-.3);dummy.updateMatrix();treads.setMatrixAt(count++,dummy.matrix)}tire.add(treads);
 // Raised fine sidewall marks, part of the modeled rubber surface.
 const marks=new THREE.InstancedMesh(new THREE.BoxGeometry(.028,.075,.008),treadMat,64);
 for(let i=0;i<64;i++){const a=i/64*Math.PI*2;dummy.position.set(Math.sin(a)*1.19,Math.cos(a)*1.19,.353);dummy.rotation.set(0,0,-a);dummy.updateMatrix();marks.setMatrixAt(i,dummy.matrix)}tire.add(marks);
 lathe([[1.005,-.29],[1.04,-.29],[1.065,-.27],[1.065,.28],[1.025,.33],[1,.32],[1.005,-.29]],darkMetal,rim);
 for(const z of [-.29,.32])mesh(new THREE.TorusGeometry(1.035,.037,12,96),bright,rim,z);
 mesh(new THREE.TorusGeometry(.99,.012,8,96),metal,rim,.329);
 function cylinder(radius,depth,mat,parent,z){const g=new THREE.CylinderGeometry(radius,radius,depth,48);g.rotateX(Math.PI/2);return mesh(g,mat,parent,z)}
 const hub=cylinder(.235,.2,metal,rim,.26);mesh(new THREE.TorusGeometry(.22,.015,8,48),bright,rim,.372);
 // Five paired sculpted spokes with bevelled edges.
 const spoke=new THREE.Shape();spoke.moveTo(-.072,.18);spoke.bezierCurveTo(-.055,.5,-.04,.84,-.03,1.016);spoke.lineTo(.058,1.016);spoke.bezierCurveTo(.10,.75,.10,.44,.094,.18);spoke.closePath();
 const spokeGeo=new THREE.ExtrudeGeometry(spoke,{depth:.11,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.015,bevelThickness:.012,curveSegments:7});
 for(let i=0;i<5;i++)for(const side of [-1,1]){const s=mesh(spokeGeo,bright,rim,.23);s.rotation.z=i/5*Math.PI*2+side*.16;s.scale.x=side;}
 for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const bolt=cylinder(.035,.035,darkMetal,rim,.383);bolt.position.x=Math.sin(a)*.158;bolt.position.y=Math.cos(a)*.158;mesh(new THREE.TorusGeometry(.038,.005,6,16),bright,bolt,.02);}
 const label=document.createElement('canvas');label.width=256;label.height=256;const ctx=label.getContext('2d');ctx.fillStyle='#141a18';ctx.fillRect(0,0,256,256);ctx.fillStyle='#e9e8de';ctx.textAlign='center';ctx.font='600 75px Arial';ctx.fillText('AR',128,145);ctx.fillStyle='#f46b32';ctx.fillRect(78,165,100,4);const tex=new THREE.CanvasTexture(label);tex.colorSpace=THREE.SRGBColorSpace;
 const center=cylinder(.113,.025,darkMetal,rim,.393);mesh(new THREE.CircleGeometry(.11,40),new THREE.MeshStandardMaterial({map:tex,metalness:.3,roughness:.5}),center,.014);
 // Ventilated and drilled brake rotor, with actual holes in the geometry.
 const discShape=new THREE.Shape();discShape.absarc(0,0,.855,0,Math.PI*2,false);const middle=new THREE.Path();middle.absarc(0,0,.21,0,Math.PI*2,true);discShape.holes.push(middle);
 for(let i=0;i<36;i++){const a=i*Math.PI*2/36;for(const r of [.62,.74]){const h=new THREE.Path();h.absarc(Math.cos(a+(r===.62?.045:0))*r,Math.sin(a+(r===.62?.045:0))*r,.02,0,Math.PI*2,true);discShape.holes.push(h)}}
 const discGeo=new THREE.ExtrudeGeometry(discShape,{depth:.045,bevelEnabled:false,curveSegments:48});const disc=mesh(discGeo,rotorMat,brake,-.13);
 const rear=mesh(discGeo,rotorMat,brake,-.22);
 const fins=new THREE.InstancedMesh(new THREE.BoxGeometry(.024,.35,.05),darkMetal,40);
 for(let i=0;i<40;i++){const a=i*Math.PI*2/40;dummy.position.set(Math.sin(a)*.64,Math.cos(a)*.64,-.16);dummy.rotation.set(0,0,-a);dummy.updateMatrix();fins.setMatrixAt(i,dummy.matrix)}brake.add(fins);
 cylinder(.35,.1,darkMetal,brake,-.06);mesh(new THREE.TorusGeometry(.34,.014,8,60),metal,brake,0);
 // Orange caliper stays fixed while the tire and alloy rotate together.
 const calShape=new THREE.Shape();calShape.moveTo(-.13,-.42);calShape.quadraticCurveTo(-.2,-.42,-.2,-.3);calShape.lineTo(-.2,.3);calShape.quadraticCurveTo(-.2,.43,-.09,.43);calShape.lineTo(.1,.40);calShape.quadraticCurveTo(.18,.39,.18,.26);calShape.lineTo(.18,-.3);calShape.quadraticCurveTo(.18,-.42,.08,-.42);calShape.closePath();
 const cal=mesh(new THREE.ExtrudeGeometry(calShape,{depth:.22,bevelEnabled:true,bevelSegments:3,bevelSize:.04,bevelThickness:.025,curveSegments:8}),orange,brake,-.05);cal.position.x=.72;cal.rotation.z=-.18;
 for(const y of [-.18,.18]){const b=cylinder(.04,.022,darkMetal,cal,.27);b.position.y=y;}
 root.rotation.set(.09,-.43,-.07);
 function size(){const box=canvas.parentElement.getBoundingClientRect();renderer.setSize(box.width,box.height,false);camera.aspect=box.width/box.height;camera.updateProjectionMatrix();camera.position.z=innerWidth<700?6.35:innerWidth<1100?7.7:6.15;}
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
   root.position.x=exploded*.08;root.position.y=0;canvas.parentElement.style.top=innerWidth<700?(22+exploded*18)+'%':'';
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
