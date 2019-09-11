if (workbox) {
  console.log('Workbox is loaded')

  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

  workbox.precaching.precacheAndRoute(self.__precacheManifest)

  workbox.routing.registerRoute(
    /\.js$/,
  )

  workbox.routing.registerRoute(
    new RegExp('/api/players'),
    new workbox.strategies.StaleWhileRevalidate()
  )
} 
else {
  console.log('Workbox failed to load')
}