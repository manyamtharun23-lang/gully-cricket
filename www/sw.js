// Network first: online = latest version, offline = saved copy
var C='gully-cache-v1';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','index.html'])}))});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(function(r){
    var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r;
  }).catch(function(){
    return caches.match(e.request).then(function(r){return r||caches.match('./')});
  }));
});
