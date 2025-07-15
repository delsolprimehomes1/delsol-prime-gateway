
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function ServiceWorkerProvider() {
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          console.log('ServiceWorker registered:', registration);

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available
                  toast({
                    title: "Update Available",
                    description: "A new version of the site is available. Refresh to get the latest features.",
                    action: (
                      <button
                        onClick={() => window.location.reload()}
                        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
                      >
                        Refresh
                      </button>
                    ),
                  });
                }
              });
            }
          });

        } catch (error) {
          console.error('ServiceWorker registration failed:', error);
        }
      };

      registerSW();
    }
  }, [toast]);

  return null;
}

// Service Worker script content (to be saved as public/sw.js)
export const serviceWorkerScript = `
const CACHE_NAME = 'delsolprimehomes-v1';
const STATIC_ASSETS = [
  '/',
  '/blog',
  '/faq',
  '/manifest.json',
  // Add other critical assets
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
`;
