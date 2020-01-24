import fib from './fib'

const handleMessage = e => {
  const result = fib(e.data)
  self.postMessage(result)
}

self.addEventListener('message', handleMessage)