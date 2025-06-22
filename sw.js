// Nom du cache
const CACHE_NAME = 'nephro-pro-cache-v1';

// Fichiers à mettre en cache dès l'installation
// Important : Le chemin vers vos fichiers JS et CSS dépend de votre configuration (Vite, Create React App, etc.)
// Adaptez les chemins si votre outil de build génère des noms de fichiers avec des hash.
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  // Chemins corrigés pour les icônes
  'icon-72x72.png',
  'icon-96x96.png',
  'icon-192x192.png',
  'icon-512x512.png'
  // Vous ajouterez ici les chemins vers vos fichiers JS et CSS
  // ex: '/assets/index-a4b1c2d3.js', 
];

// Installation du Service Worker et mise en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Stratégie "Cache-First"
// Le Service Worker essaie de servir depuis le cache d'abord.
// S'il ne trouve pas la ressource, il la demande au réseau.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la réponse est dans le cache, on la retourne
        if (response) {
          return response;
        }
        // Sinon, on fait une requête réseau
        return fetch(event.request);
      }
    )
  );
});
