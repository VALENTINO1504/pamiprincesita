const CACHE_NAME = "flores-cache-v1";
const ASSETS = [
    "index.html",
    "style.css",
    "script.js",
    "manifest.json",
    "flor.png",
    "icon.png"
];

// Instalar el Service Worker y almacenar en caché los archivos esenciales
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activar y limpiar caché antigua si hay una nueva versión
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Interceptar solicitudes y responder desde la caché si es posible
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
