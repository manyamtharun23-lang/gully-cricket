var C='gully-cache-v3';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}));
  }).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(r,{cache:'no-store'}).then(function(res){
    var cp=res.clone();
    caches.open(C).then(function(c){return c.put(r,cp)}).catch(function(){});
    return res;
  }).catch(function(){
    return caches.match(r).then(function(x){return x||caches.match('./')});
  }));
});
