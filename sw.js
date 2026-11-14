const V='kegely-v12';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
const FONT_CSS='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap';
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(async c=>{
    await c.addAll(CORE);
    try{
      const res=await fetch(FONT_CSS,{mode:'cors',credentials:'omit'});
      if(res.ok){
        await c.put(FONT_CSS,res.clone());
        const css=await res.text();
        const urls=[...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m=>m[1].replace(/['"]/g,'')))];
        await Promise.all(urls.map(u=>{
          const req=new Request(u,{mode:'cors',credentials:'omit'});
          return fetch(req).then(r=>r.ok?c.put(req,r):null).catch(()=>null);
        }));
      }
    }catch(err){}
  }).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(!(u.origin===location.origin||u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'))return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));}return res;}).catch(()=>caches.match('index.html').then(m=>m||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>{
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));}return res;}).catch(()=>hit);
    return hit||net;
  }));
});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus().then(w=>{if(w&&'navigate' in w&&!/#timer$/.test(w.url))return w.navigate('./#timer');}).catch(()=>{});}return self.clients.openWindow('./#timer');}));});
