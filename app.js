const K='resneo',$=(s,e=document)=>e.querySelector(s),D={ebook:0,quiz:null,video:[]};
const S={get(){try{return Object.assign({},D,JSON.parse(localStorage.getItem(K)))}catch(e){return{...D}}},set(o){localStorage.setItem(K,JSON.stringify({...S.get(),...o}))},reset(){localStorage.removeItem(K);localStorage.removeItem('resneo:seenIntro');location.reload()}};
const P=(location.pathname.split('/').pop()||'index').replace('.html','')||'index';
const NAV=[['index','Beranda'],['ebook','Materi'],['kuis','Kuis'],['video','Video']];
const THEME_K='resneo:theme';
const getTheme=()=>localStorage.getItem(THEME_K)||'dark';
const applyTheme=t=>{document.documentElement.setAttribute('data-theme',t);const logo=$('.hd .logo');if(logo)logo.src=t==='light'?'assets/resneo-logo.png':'assets/resneo-logo-white.png';};
applyTheme(getTheme());
const ICON_SUN='<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6"/></svg>';
const ICON_MOON='<svg class="i-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>';
const hd=$('#hd');if(hd)hd.innerHTML=`<header class="hd"><div class="w"><a class="lg" href="index.html"><img class="logo" src="assets/resneo-logo-white.png" alt="Logo ResNeo Indonesia">ResNeo Indonesia</a><button class="bg" aria-label="Menu">☰</button><nav class="nv">${NAV.map(([p,t])=>`<a href="${p}.html" class="${p==P?'on':''}">${t}</a>`).join('')}<button class="th" id="themeToggle" aria-label="Ganti tema terang/gelap" title="Ganti tema">${ICON_SUN}${ICON_MOON}</button><a class="bt o" href="login.html" style="min-height:40px">Admin</a></nav></div></header>`;
if(hd){$('.bg').onclick=()=>$('.nv').classList.toggle('open');}
if(hd&&$('#themeToggle'))$('#themeToggle').onclick=()=>{const n=getTheme()==='light'?'dark':'light';localStorage.setItem(THEME_K,n);applyTheme(n);};
applyTheme(getTheme());
const ft=$('#ft');if(ft)ft.innerHTML=`<footer class="ft"><div class="w sp"><span>© 2026 ResNeo Indonesia · Tampilan contoh (demo), data tidak nyata</span><a href="#" onclick="S.reset();return false">Reset demo</a></div></footer>`;
const INTRO_K='resneo:seenIntro';
if(!localStorage.getItem(INTRO_K)){
const el=document.createElement('div');el.className='intro';el.id='intro';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-labelledby','introt');
el.innerHTML=`<span class="orb o1"></span><span class="orb o2"></span><div class="card"><div class="badge"><img src="assets/resneo-logo-white.png" alt="Logo ResNeo Indonesia"></div><span class="eyebrow">ResNeo Indonesia</span><h2 id="introt">Selamat datang di pratinjau interaktif</h2><p>Halaman ini adalah <b>mockup</b> untuk menggambarkan alur dan navigasi antar halaman layanan e-learning.</p><p class="fine">Tampilan dan desain belum final — masih dapat disesuaikan sebelum pengembangan.</p><button class="bt" id="introb">Mulai navigasi website</button><p class="hint">Tekan Esc atau klik di luar kartu untuk menutup</p></div>`;
document.body.appendChild(el);
document.body.style.overflow='hidden';
const close=()=>{localStorage.setItem(INTRO_K,'1');el.classList.remove('open');document.body.style.overflow='';setTimeout(()=>el.remove(),350)};
$('#introb').onclick=close;el.onclick=e=>{if(e.target===el)close()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&el.isConnected)close()});
requestAnimationFrame(()=>{el.classList.add('open');$('#introb')?.focus()});
}
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-revealed');io.unobserve(en.target)}}),{threshold:.12});
document.querySelectorAll('.g3>.cd,.g4>.cd,.sh,.cta,#prog').forEach(n=>{n.classList.add('reveal');io.observe(n)});
}
const WM='Dr. Contoh · contoh@email.com',T=Array.from({length:8},(_,i)=>`Judul materi contoh ${i+1}`);
const PAGES={
index(){const s=S.get(),e=Math.round(s.ebook/8*100),q=s.quiz&&s.quiz.pass,v=s.video.length,ok=e==100&&q&&v==6;
$('#prog').innerHTML=`<div class="sp"><h3>Kemajuan belajar Anda</h3><span class="tg ${ok?'':'w'}">${ok?'Siap tatap muka':'Dalam proses'}</span></div><div class="g3" style="margin-top:18px">${[['Ebook',e+'%',e],['Kuis',q?'Lulus ('+s.quiz.score+')':s.quiz?'Belum lulus':'Belum dikerjakan',q?100:0],['Video',v+'/6',Math.round(v/6*100)]].map(([a,b,c])=>`<div><div class="sp"><b>${a}</b><span class="mu">${b}</span></div><div class="bar" style="margin-top:8px"><i style="width:${c}%"></i></div></div>`).join('')}</div>`},
ebook(){let c=Math.max(1,S.get().ebook),t;
window.go=n=>{c=n;draw()};
function draw(){const mx=S.get().ebook;clearInterval(t);
$('#toc').innerHTML=T.map((x,i)=>`<button class="ti ${i+1==c?'on':''}" ${i+1>mx+1?'disabled':''} onclick="go(${i+1})"><span>${i+1}. ${x}</span><small>${i<mx?'Selesai':i==mx?'Dibaca':'Terkunci'}</small></button>`).join('');
$('#pn').textContent=`Halaman ${c} dari 8`;$('#pb').style.width=c/8*100+'%';
$('#pc').innerHTML=`<div class="wm">${WM}</div><span class="tg">Bab ${Math.ceil(c/2)}</span><h2 style="margin-top:12px">${T[c-1]}</h2><img src="assets/ebook.svg" alt="Ilustrasi materi"><p>Ini adalah teks contoh untuk halaman ${c}. Ganti dengan isi ebook resmi. Nama peserta tampil samar sebagai watermark di setiap halaman.</p><p class="mu" style="margin-top:12px">Halaman berikutnya terbuka setelah halaman ini dibaca.</p>`;
const nx=$('#nx');nx.disabled=c>mx;$('#pv').disabled=c==1;nx.textContent=c>=8?'Lanjut ke kuis':'Berikutnya';
if(c>mx){let n=3;nx.textContent=`Baca dulu (${n})`;t=setInterval(()=>{n--;if(n<=0){S.set({ebook:c});draw()}else nx.textContent=`Baca dulu (${n})`},1000)}}
$('#pv').onclick=()=>go(c-1);$('#nx').onclick=()=>c>=8?location.href='kuis.html':go(c+1);draw()},
kuis(){const Q=[1,0,2,3,1].map((a,i)=>({q:`Contoh soal ${i+1}: teks soal akan diganti dengan soal resmi.`,a}));let i=0,ans=[];
const r=()=>{$('#qn').innerHTML=Q.map((_,k)=>`<button class="${k==i?'c':ans[k]!=null?'d':''}" onclick="jmp(${k})">${k+1}</button>`).join('');
$('#qh').textContent=`Soal ${i+1} dari ${Q.length}`;$('#qb').style.width=(i+1)/Q.length*100+'%';$('#qq').textContent=Q[i].q;
$('#qo').innerHTML='ABCD'.split('').map((c,k)=>`<button class="op ${ans[i]==k?'s':''}" onclick="pick(${k})"><b>${c}</b>Pilihan jawaban ${c}</button>`).join('');
$('#qp').disabled=i==0;$('#qx').textContent=i==Q.length-1?'Kumpulkan':'Selanjutnya'};
window.jmp=k=>{i=k;r()};window.pick=k=>{ans[i]=k;r()};
$('#qp').onclick=()=>jmp(i-1);
$('#qx').onclick=()=>{if(i<Q.length-1)return jmp(i+1);const sc=Math.round(Q.filter((q,k)=>ans[k]==q.a).length/Q.length*100),pass=sc>=70;S.set({quiz:{score:sc,pass}});
$('#quiz').style.display='none';$('#res').style.display='block';$('#rs').textContent=sc;$('#rt').innerHTML=pass?'<span class="tg">Lulus</span>':'<span class="tg w">Belum lulus (minimal 70)</span>';$('#rn').href=pass?'video.html':'kuis.html'};
r()},
video(){const s=S.get(),C=['video1','video2','video3'];
const draw=()=>{const w=S.get().video;$('#vg').innerHTML=Array.from({length:6},(_,i)=>`<a href="#" class="cd ci vc" onclick="op(${i});return false"><img src="assets/${C[i%3]}.svg" alt=""><span class="tg pl ${w.includes(i)?'':'w'}">${w.includes(i)?'Selesai':'Belum'}</span><div><h3 style="font-size:18px">Video materi contoh ${i+1}</h3><p class="mu">Durasi contoh · 05:00</p></div></a>`).join('')};
window.op=i=>{$('#mi').src=`assets/${C[i%3]}.svg`;$('#mt').textContent=`Video materi contoh ${i+1}`;$('#md').classList.add('open');$('#mk').onclick=()=>{const w=S.get().video;if(!w.includes(i))S.set({video:[...w,i]});$('#md').classList.remove('open');draw()}};
$('#mc').onclick=()=>$('#md').classList.remove('open');draw()},
login(){$('#lf').onsubmit=e=>{e.preventDefault();if($('#em').value&&$('#pw').value){sessionStorage.adm=1;location.href='admin.html'}else $('#er').style.display='block'}},
admin(){if(!sessionStorage.adm)location.href='login.html';
const R=[['Dr. Contoh A',100,85,6],['Dr. Contoh B',100,70,3],['Dr. Contoh C',100,null,0],['Dr. Contoh D',62,null,0],['Dr. Contoh E',25,null,0],['Dr. Contoh F',0,null,0],['Dr. Contoh G',100,92,6],['Dr. Contoh H',100,60,0]];
const st=r=>r[1]==100&&r[2]>=70&&r[3]==6?'Siap tatap muka':r[1]==0?'Belum mulai':'Dalam proses';
const draw=()=>{const f=$('#sq').value.toLowerCase(),L=R.filter(r=>r[0].toLowerCase().includes(f));
$('#tb').innerHTML=L.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}%</td><td>${r[2]??'-'}</td><td>${r[3]}/6</td><td><span class="tg ${st(r)=='Siap tatap muka'?'':'w'}">${st(r)}</span></td></tr>`).join('');
const sc=R.filter(r=>r[2]!=null);$('#s1').textContent=R.length;$('#s2').textContent=R.filter(r=>st(r)=='Siap tatap muka').length;$('#s3').textContent=Math.round(sc.reduce((a,r)=>a+r[2],0)/sc.length)};
$('#sq').oninput=draw;$('#ad').onclick=()=>{const n=prompt('Nama peserta baru:');if(n){R.push([n,0,null,0]);draw()}};
$('#dl').onclick=()=>{const c='Nama\n'+R.filter(r=>st(r)=='Siap tatap muka').map(r=>r[0]).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c]));a.download='siap-tatap-muka.csv';a.click()};
$('#lo').onclick=()=>{sessionStorage.removeItem('adm')};draw()}};
(PAGES[P]||(()=>{}))();
