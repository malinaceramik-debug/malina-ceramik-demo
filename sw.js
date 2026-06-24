importScripts("./firebase-config-sw.js");

const CACHE = "malina-ceramik-demo-v54";
const ASSETS = [
  "./",
  "install.html",
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
  "assets/malina-app-icon-v2.png",
  "assets/malina-app-icon-maskable-v2.png",
  "assets/malina-app-icon-flat-512.png",
  "assets/malina-app-icon-maskable-flat-512.png",
  "assets/malina-app-icon-full-512.png",
  "assets/malina-app-icon-maskable-full-512.png",
  "assets/malina-share-icon-512-20260621.png",
  "assets/malina-app-icon-composed-2048.png",
  "assets/malina-app-icon-composed-512.png",
  "assets/malina-app-icon-composed-maskable-512.png",
  "apple-touch-icon-ios-full-20260621-v2.png",
  "assets/apple-touch-icon-ios-full-20260621-v2.png",
  "apple-touch-icon-full-20260621.png",
  "assets/apple-touch-icon-malina-full-20260621.png",
  "assets/apple-touch-icon-malina-composed-20260620.png",
  "assets/apple-touch-icon-malina-20260620.png",
  "assets/apple-touch-icon-malina-flat-20260620.png",
  "apple-touch-icon.png",
  "apple-touch-icon-precomposed.png",
  "apple-touch-icon-57x57.png",
  "apple-touch-icon-60x60.png",
  "apple-touch-icon-72x72.png",
  "apple-touch-icon-76x76.png",
  "apple-touch-icon-114x114.png",
  "apple-touch-icon-120x120.png",
  "apple-touch-icon-144x144.png",
  "apple-touch-icon-152x152.png",
  "apple-touch-icon-167x167.png",
  "apple-touch-icon-180x180.png",
  "apple-touch-icon-192x192.png",
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
      icon: "./assets/malina-app-icon-v2.png",
      badge: "./assets/malina-app-icon-v2.png",
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
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;
  const appShellRequest =
    sameOrigin &&
    (event.request.mode === "navigate" ||
      ["document", "script", "style", "manifest"].includes(event.request.destination) ||
      ["/", "/index.html", "/app.js", "/styles.css", "/manifest.json"].includes(url.pathname));

  if (appShellRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./"))),
    );
    return;
  }

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
