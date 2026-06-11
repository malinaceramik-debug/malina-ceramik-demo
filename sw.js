const CACHE = "malina-ceramik-demo-v19";
const ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "assets/malina-wordmark.png",
  "assets/malina-cup-logo.png",
  "assets/malina-apron.png",
  "assets/malina-app-icon.png",
  "assets/malina-app-icon-maskable.png",
  "assets/malina-hands-hero.webp",
  "assets/malina-hands-mobile.webp",
  "assets/kubek.webp",
  "assets/miska.webp",
  "assets/wazon.webp",
  "assets/talerz.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
