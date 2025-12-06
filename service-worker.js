const CACHE_NAME = "phaser-game-cache-v1";

// Folder yang mau dicache otomatis
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install → simpan file awal ke cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch → pakai cache dulu, kalau tidak ada ambil dari jaringan
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
