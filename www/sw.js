var C='gully-cache-v3';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','index.html'])}).catch(function(){}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 var r=e.request;if(r.method!=='GET')return;
 if(new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r,{cache:'no-store'}).then(function(x){var cp=x.clone();caches.open(C).then(function(c){c.put(r,cp)});return x}).catch(function(){return caches.match(r).then(function(x){return x||caches.match('./')})}));
});
