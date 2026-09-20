import * as THREE from 'three';

/** Original performance-wheel illustration, inspired by premium twin-spoke alloys. */
export function createPerformanceWheel() {
 const root=new THREE.Group(),tire=new THREE.Group(),rim=new THREE.Group(),brake=new THREE.Group();root.add(tire,rim,brake);
 const rubber=new THREE.MeshStandardMaterial({color:0x080b0a,roughness:.82,metalness:0,envMapIntensity:.17});
 const grooveMat=new THREE.MeshStandardMaterial({color:0x020403,roughness:.96,metalness:0,envMapIntensity:.05});
 const sidewallMat=new THREE.MeshStandardMaterial({color:0x141916,roughness:.88,metalness:0,envMapIntensity:.18});
 const forged=new THREE.MeshPhysicalMaterial({color:0x1d2527,metalness:.94,roughness:.25,clearcoat:.65,clearcoatRoughness:.18});
 const machined=new THREE.MeshStandardMaterial({color:0xbfc6c8,metalness:.86,roughness:.29});
 const polish=new THREE.MeshStandardMaterial({color:0xe0e4e2,metalness:1,roughness:.15});
 const rotorMat=new THREE.MeshStandardMaterial({color:0x707878,metalness:.93,roughness:.44});
 const brushed=new THREE.MeshStandardMaterial({color:0x626969,metalness:.9,roughness:.5});
 const rotorEdge=new THREE.MeshStandardMaterial({color:0x202a2a,metalness:.8,roughness:.55});
 const caliperMat=new THREE.MeshPhysicalMaterial({color:0xd92d08,metalness:.35,roughness:.31,clearcoat:.8,clearcoatRoughness:.25});
 function mesh(geo,mat,parent,z=0){const m=new THREE.Mesh(geo,mat);m.position.z=z;parent.add(m);return m;}
 function ring(r,t,mat,parent,z){return mesh(new THREE.TorusGeometry(r,t,8,160),mat,parent,z);}
 function cylinder(r,depth,mat,parent,z,segments=48){const g=new THREE.CylinderGeometry(r,r,depth,segments);g.rotateX(Math.PI/2);return mesh(g,mat,parent,z);}
 function lathe(points,mat,parent,smooth=false){let p=points.map(([r,z])=>new THREE.Vector2(r,z));if(smooth){const curve=new THREE.SplineCurve(p);p=curve.getPoints(160);}const g=new THREE.LatheGeometry(p,192);g.rotateX(Math.PI/2);return mesh(g,mat,parent);}
 // Low sidewall and a wide, rounded summer-tire crown. Four continuous drainage
 // channels are cut into the radial profile, rather than modeled as raised blocks.
 const profile=[[1.185,-.265],[1.206,-.304],[1.24,-.321],[1.29,-.325],[1.338,-.315],[1.378,-.287],[1.411,-.251],[1.427,-.219],
 [1.432,-.193],[1.432,-.173],[1.418,-.169],[1.416,-.151],[1.432,-.146],
 [1.434,-.071],[1.416,-.065],[1.415,-.047],[1.434,-.043],
 [1.434,.043],[1.415,.047],[1.416,.065],[1.434,.071],
 [1.432,.146],[1.416,.151],[1.418,.169],[1.432,.173],[1.432,.193],[1.427,.219],
 [1.411,.251],[1.378,.287],[1.338,.315],[1.29,.325],[1.24,.321],[1.206,.304],[1.185,.265],[1.185,-.265]];
 lathe(profile,rubber,tire);
 for(const z of [-.316,.316]){ring(1.245,.003,sidewallMat,tire,z);ring(1.3,.0025,sidewallMat,tire,z);}
 // Subtle recessed-looking diagonal sipes. The crown silhouette remains smooth.
 const cuts=new THREE.InstancedMesh(new THREE.BoxGeometry(.007,.0018,.067),grooveMat,112*6);const dummy=new THREE.Object3D();let n=0;
 for(let i=0;i<112;i++)for(let j=0;j<6;j++){const a=i/112*Math.PI*2+(j%2)*.011;const z=[-.205,-.115,-.011,.023,.112,.207][j];const r=Math.abs(z)>.19?1.430:1.435;dummy.position.set(Math.cos(a)*r,Math.sin(a)*r,z);dummy.rotation.set(0,0,a-Math.PI/2);dummy.rotateY(j<3?.5:-.5);dummy.updateMatrix();cuts.setMatrixAt(n++,dummy.matrix);}tire.add(cuts);
 // Molded sidewall lettering is restrained and dark, like embossed rubber.
 const sideLabel=document.createElement('canvas');sideLabel.width=sideLabel.height=1024;const s=sideLabel.getContext('2d');
 function arcText(text,center,r,font){s.font=font;s.fillStyle='#3e4541';s.textAlign='center';s.textBaseline='middle';const step=.035;const begin=center-(text.length-1)*step/2;for(let i=0;i<text.length;i++){const a=begin+i*step;s.save();s.translate(512+Math.cos(a)*r,512+Math.sin(a)*r);s.rotate(a+Math.PI/2);s.fillText(text[i],0,0);s.restore();}}
 arcText('PERFORMANCE',-Math.PI/2,476,'600 22px Arial');arcText('295 / 30 ZR 20',Math.PI/2,476,'500 18px Arial');arcText('SPORT',Math.PI,479,'600 16px Arial');
 const sideTex=new THREE.CanvasTexture(sideLabel);sideTex.colorSpace=THREE.SRGBColorSpace;
 mesh(new THREE.RingGeometry(1.205,1.38,192),new THREE.MeshStandardMaterial({map:sideTex,transparent:true,depthWrite:false,roughness:.85,metalness:0,polygonOffset:true,polygonOffsetFactor:-1}),tire,.326);
 // Thin polished rim flange and gloss anthracite barrel, sized for a low-profile tire.
 lathe([[1.177,-.275],[1.198,-.284],[1.209,-.27],[1.209,.283],[1.20,.316],[1.184,.325],[1.164,.31],[1.177,-.275]],forged,rim);
 ring(1.197,.016,polish,rim,.316);ring(1.162,.006,machined,rim,.316);ring(1.194,.012,machined,rim,-.279);
 cylinder(.246,.105,forged,rim,.13);ring(.236,.009,machined,rim,.186);
 // Sculpted five-twin-spoke design: a concave face, black pockets and diamond-cut
 // front surfaces. Mirroring the contour (not mesh scale) preserves the normals.
 function spokeShape(side,inset=0){const sh=new THREE.Shape();const a=(x,y)=>[side*x,y];sh.moveTo(...a(.006+inset,.215));sh.lineTo(...a(.086-inset,.215));sh.bezierCurveTo(...a(.11-inset,.48),...a(.203-inset,.84),...a(.253-inset,1.142));sh.quadraticCurveTo(...a(.245-inset,1.174),...a(.21-inset,1.181));sh.lineTo(...a(.174+inset,1.183));sh.bezierCurveTo(...a(.148+inset,.9),...a(.055+inset,.5),...a(.006+inset,.215));sh.closePath();return sh;}
 function dish(geo,offset){const attr=geo.attributes.position;for(let i=0;i<attr.count;i++){const r=Math.hypot(attr.getX(i),attr.getY(i));const f=THREE.MathUtils.clamp((r-.21)/.99,0,1);attr.setZ(i,attr.getZ(i)+offset+.165*Math.pow(f,1.65));}attr.needsUpdate=true;geo.computeVertexNormals();return geo;}
 for(let i=0;i<5;i++)for(const side of [-1,1]){
   const shape=spokeShape(side);const g=dish(new THREE.ExtrudeGeometry(shape,{depth:.06,bevelEnabled:true,bevelSegments:3,bevelSize:.009,bevelThickness:.01,curveSegments:18}),.095);
   const solid=mesh(g,[machined,forged],rim);solid.rotation.z=i/5*Math.PI*2;
   // An inset metal face follows the sculpted section and catches the studio softbox.
   const face=dish(new THREE.ShapeGeometry(spokeShape(side,.014),24),.169);const f=mesh(face,machined,rim);f.rotation.z=solid.rotation.z;
 }
 for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const socket=cylinder(.036,.028,rotorEdge,rim,.19,32);socket.position.set(Math.sin(a)*.175,Math.cos(a)*.175,.19);const bolt=cylinder(.023,.015,machined,socket,.02,6);ring(.034,.003,polish,socket,.018);}
 cylinder(.125,.038,forged,rim,.202);ring(.12,.007,polish,rim,.222);
 const badge=document.createElement('canvas');badge.width=badge.height=256;const b=badge.getContext('2d');b.fillStyle='#101715';b.fillRect(0,0,256,256);b.fillStyle='#e7e9e1';b.font='600 79px Arial';b.textAlign='center';b.fillText('AR',128,148);b.fillStyle='#ee632f';b.fillRect(90,169,76,3);const badgeTex=new THREE.CanvasTexture(badge);badgeTex.colorSpace=THREE.SRGBColorSpace;mesh(new THREE.CircleGeometry(.113,48),new THREE.MeshStandardMaterial({map:badgeTex,metalness:.45,roughness:.26}),rim,.224);
 // Discrete valve stem near the outer lip.
 const valve=cylinder(.018,.058,forged,rim,.347,16);valve.position.y=-1.11;cylinder(.022,.019,rotorEdge,valve,.034,12);
 // Large ventilated brake disc with three staggered rings of small drilled holes.
 const d=new THREE.Shape();d.absarc(0,0,1.025,0,Math.PI*2,false);const hole=new THREE.Path();hole.absarc(0,0,.27,0,Math.PI*2,true);d.holes.push(hole);
 for(let i=0;i<32;i++)for(let j=0;j<3;j++){const a=i/32*Math.PI*2+j*.055,r=.74+j*.092;const h=new THREE.Path();h.absarc(Math.cos(a)*r,Math.sin(a)*r,.014,0,Math.PI*2,true);d.holes.push(h);}
 const discGeo=new THREE.ExtrudeGeometry(d,{depth:.036,bevelEnabled:false,curveSegments:48});mesh(discGeo,rotorMat,brake,-.14);mesh(discGeo,rotorMat,brake,-.21);
 for(const r of [.58,.67,.80,.9,1.004])ring(r,.0009,brushed,brake,-.101);
 const vents=new THREE.InstancedMesh(new THREE.BoxGeometry(.013,.45,.04),rotorEdge,64);
 for(let i=0;i<64;i++){const a=i/64*Math.PI*2;dummy.position.set(Math.sin(a)*.775,Math.cos(a)*.775,-.162);dummy.rotation.set(0,0,-a+.12);dummy.updateMatrix();vents.setMatrixAt(i,dummy.matrix);}brake.add(vents);
 cylinder(.43,.085,forged,brake,-.10);ring(.425,.006,machined,brake,-.053);
 for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const fastener=cylinder(.018,.012,machined,brake,-.05,6);fastener.position.x=Math.sin(a)*.38;fastener.position.y=Math.cos(a)*.38;}
 // Fixed six-piston caliper: separate inboard/outboard castings, an open rotor
 // passage, contoured pads and two bridges outside the disc circumference.
 const cal=new THREE.Group();cal.position.x=.9;cal.rotation.z=-.08;brake.add(cal);
 const padMat=new THREE.MeshStandardMaterial({color:0x292824,roughness:.97,metalness:.12});
 const fastenerMat=new THREE.MeshStandardMaterial({color:0xaaaead,roughness:.27,metalness:.92});
 function bodyOutline(){const c=new THREE.Shape();c.moveTo(-.10,-.44);c.bezierCurveTo(-.19,-.35,-.20,-.24,-.18,-.13);c.quadraticCurveTo(-.15,-.01,-.18,.10);c.bezierCurveTo(-.2,.27,-.14,.43,-.04,.47);c.quadraticCurveTo(.065,.515,.13,.412);c.bezierCurveTo(.19,.29,.213,.14,.219,.01);c.bezierCurveTo(.203,-.17,.16,-.37,.075,-.453);c.quadraticCurveTo(-.015,-.502,-.10,-.44);return c;}
 function castBody(z,depth){return mesh(new THREE.ExtrudeGeometry(bodyOutline(),{depth,bevelEnabled:true,bevelSegments:5,bevelSize:.018,bevelThickness:.015,curveSegments:20}),caliperMat,cal,z);}
 castBody(-.033,.122);castBody(-.427,.14);
 // A sculpted raised rib catches light instead of a single flat rectangular face.
 const rib=new THREE.Shape();rib.moveTo(-.035,-.365);rib.quadraticCurveTo(.04,-.4,.087,-.305);rib.bezierCurveTo(.16,-.13,.157,.15,.078,.335);rib.quadraticCurveTo(.015,.42,-.04,.344);rib.quadraticCurveTo(.022,0,-.035,-.365);
 mesh(new THREE.ExtrudeGeometry(rib,{depth:.02,bevelEnabled:true,bevelSegments:4,bevelSize:.018,bevelThickness:.014,curveSegments:16}),caliperMat,cal,.096);
 // Two short shoulders join the castings beyond the edge of the spinning rotor.
 for(const y of [-.27,.27]){
   const sh=new THREE.Shape();sh.moveTo(-.037,-.07);sh.lineTo(.037,-.07);sh.quadraticCurveTo(.049,-.07,.049,-.05);sh.lineTo(.049,.05);sh.quadraticCurveTo(.049,.07,.035,.07);sh.lineTo(-.035,.07);sh.quadraticCurveTo(-.049,.07,-.049,.05);sh.lineTo(-.049,-.05);sh.quadraticCurveTo(-.049,-.07,-.037,-.07);
   const bridge=mesh(new THREE.ExtrudeGeometry(sh,{depth:.475,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:3}),caliperMat,cal,-.406);bridge.position.x=.173;bridge.position.y=y;
 }
 // Friction pads follow the rotor's curve and sit either side of its swept face.
 const pad=new THREE.Shape();pad.absarc(0,0,1.004,-.425,.425,false);pad.lineTo(Math.cos(.425)*.793,Math.sin(.425)*.793);pad.absarc(0,0,.793,.425,-.425,true);pad.closePath();
 const pg=new THREE.ExtrudeGeometry(pad,{depth:.029,bevelEnabled:false,curveSegments:36});mesh(pg,padMat,brake,-.094);mesh(pg,padMat,brake,-.253);
 // Three stepped piston housings on the rear casting; metal caps are recessed.
 for(const [y,r] of [[-.255,.085],[0,.104],[.255,.091]]){
   const boss=cylinder(r,.07,caliperMat,cal,-.448,48);boss.position.x=-.043;boss.position.y=y;
   const cap=cylinder(r*.70,.012,forged,cal,-.486,48);cap.position.x=-.043;cap.position.y=y;
   const lip=ring(r*.79,.005,fastenerMat,cal,-.490);lip.position.x=-.043;lip.position.y=y;
 }
 // Small recessed fixings, rather than large decorative holes.
 for(const y of [-.355,.355]){
   const seat=cylinder(.028,.009,rotorEdge,cal,.115,32);seat.position.set(.047,y,.115);
   const bolt=cylinder(.018,.008,fastenerMat,cal,.122,6);bolt.position.set(.047,y,.122);
 }
 // Pad retaining spring on the inward edge of the outboard casting.
 const springPoints=[new THREE.Vector3(-.153,-.2,.13),new THREE.Vector3(-.185,-.11,.145),new THREE.Vector3(-.12,0,.159),new THREE.Vector3(-.185,.11,.145),new THREE.Vector3(-.153,.2,.13)];
 mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(springPoints),24,.007,6,false),fastenerMat,cal);
 // Crossover pipe and a bleed screw, visible when the assembly opens up.
 const pipePoints=[new THREE.Vector3(.055,.387,.079),new THREE.Vector3(.065,.463,.043),new THREE.Vector3(.083,.468,-.20),new THREE.Vector3(.061,.441,-.4),new THREE.Vector3(.038,.365,-.441)];
 mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pipePoints),32,.011,8,false),fastenerMat,cal);
 const nut=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.035,6),fastenerMat);nut.position.set(-.044,.465,-.351);cal.add(nut);
 const nipple=new THREE.Mesh(new THREE.CylinderGeometry(.011,.014,.037,12),fastenerMat);nipple.position.set(-.044,.495,-.351);cal.add(nipple);
 const cap=new THREE.Mesh(new THREE.CapsuleGeometry(.014,.018,4,8),rubber);cap.position.set(-.044,.519,-.351);cal.add(cap);
 const text=document.createElement('canvas');text.width=128;text.height=512;const t=text.getContext('2d');t.translate(64,256);t.rotate(-Math.PI/2);t.font='600 41px Arial';t.textAlign='center';t.fillStyle='#ece9e0';t.fillText('A.R. CARS',0,14);const textTex=new THREE.CanvasTexture(text);textTex.colorSpace=THREE.SRGBColorSpace;
 const wordmark=mesh(new THREE.PlaneGeometry(.08,.34),new THREE.MeshBasicMaterial({map:textTex,transparent:true,depthWrite:false}),cal,.135);wordmark.position.x=.063;
 // A substantially wider contact patch and barrel, with the existing low sidewall.
 tire.scale.z=1.6;rim.scale.z=1.6;
 root.rotation.set(.09,-.43,-.07);
 return {root,tire,rim,brake};
}
