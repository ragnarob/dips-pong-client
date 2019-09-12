if (workbox) {
  console.log('Workbox is loaded')

  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

  workbox.precaching.precacheAndRoute(self.__precacheManifest)

  workbox.routing.registerRoute(
    /\.js$/,
  )
} 
else {
  console.log('Workbox failed to load')
}