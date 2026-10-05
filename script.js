document.getElementById('year').textContent = new Date().getFullYear();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector('.scroll-progress');
const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting)e.target.classList.add('visible'); }), {threshold:.16});
document.querySelectorAll('[data-reveal]').forEach(n => observer.observe(n));
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${m>0?scrollY/m*100:0}%`},{passive:true});
const scene=document.getElementById('book-scene'),book=document.getElementById('book');
if(!reduceMotion&&matchMedia('(pointer:fine)').matches){scene.addEventListener('pointermove',e=>{const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;book.style.transform=`rotateX(${5-y*12}deg) rotateY(${-22+x*22}deg) rotateZ(${x*2}deg)`});scene.addEventListener('pointerleave',()=>book.style.transform='rotateX(5deg) rotateY(-22deg) rotateZ(1deg)');document.querySelectorAll('.magnetic').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')})}
const canvas=document.getElementById('depth-canvas'),ctx=canvas.getContext('2d');let dots=[];
function resize(){const d=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*d;canvas.height=innerHeight*d;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);dots=Array.from({length:innerWidth<600?18:38},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+1,s:Math.random()*.18+.04}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);dots.forEach(p=>{p.y-=p.s;if(p.y< -5)p.y=innerHeight+5;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(199,223,139,.28)';ctx.fill()});if(!reduceMotion)requestAnimationFrame(draw)}resize();draw();addEventListener('resize',resize,{passive:true});
// Replace each .buy-link mailto URL with a live checkout URL before launch.
