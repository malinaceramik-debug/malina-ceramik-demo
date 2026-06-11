importScripts("./firebase-config-sw.js");

const CACHE = "malina-ceramik-demo-v31";
const ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "backend.js",
  "firebase-config.js",
  "firebase-config-sw.js",
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

if (self.MALINA_FIREBASE_CONFIG?.apiKey) {
  importScripts(
    "https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js",
  );
  firebase.initializeApp(self.MALINA_FIREBASE_CONFIG);
  firebase.messaging().onBackgroundMessage((payload) => {
    const title = payload.notification?.title || "Malina ceramik";
    const options = {
      body: payload.notification?.body || "Nowa informacja z pracowni.",
      icon: "./assets/malina-app-icon.png",
      badge: "./assets/malina-app-icon.png",
      data: {
        url: payload.fcmOptions?.link || payload.data?.url || "./",
      },
    };
    self.registration.showNotification(title, options);
  });
}

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

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "./", self.location.origin).href;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      const matchingWindow = windows.find((windowClient) => windowClient.url === target);
      return matchingWindow ? matchingWindow.focus() : clients.openWindow(target);
    }),
  );
});
