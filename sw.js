const C='saedni-v31';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||/\.apk$/i.test(u.pathname))return;
  const key=u.origin+u.pathname;
  e.respondWith(fetch(e.request).then(r=>{
    if(r&&r.ok){const c=r.clone();caches.open(C).then(ch=>ch.put(key,c)).catch(()=>{});}
    return r;
  }).catch(()=>caches.match(key).then(m=>m||caches.match(u.origin+u.pathname.replace(/[^/]*$/,'index.html')))));
});
