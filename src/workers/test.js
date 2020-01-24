self.addEventListener(
  'message',
  function(e) {
    setInterval(() => {
      self.postMessage('I am working')
    }, 10000)
  },
  false,
)