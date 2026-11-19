const C='queenie-v7';const F=['./','index.html','mapa.jpg','leaflet.js','xlsx.full.min.js','leaflet-geoman.min.js','supabase.js','manifest.webmanifest','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='queenie-tiles').map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(u.hostname==='server.arcgisonline.com'){e.respondWith(caches.open('queenie-tiles').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok||res.type==='opaque')c.put(e.request,res.clone());return res}))));return}
 if(u.origin!==location.origin)return;
 if(u.pathname.endsWith('/')||u.pathname.endsWith('.html')){e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cl=r.clone();caches.open(C).then(c=>c.put(e.request,cl));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok){const cl=res.clone();caches.open(C).then(c=>c.put(e.request,cl))}return res})))});
