var v='0';
self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open(v).then(function(cache){
      return cache.add('/scope/');
    })
  )
});
self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys().then(function(keyList){
      return Promise.all(keyList.map(function(key,i){
        if(key!==v)return caches.delete(keyList[i])
      }))
    })
  )
});
self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request);
    })
  )
});
