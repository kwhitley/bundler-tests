function calculateFib(position) {
  let count = 0
  function fib(num) {
    count++
    if (num === 0) return 0
    if (num === 1) return 1
    return fib(num - 1) + fib(num - 2)
  }
  const result = fib(position)
  console.log(`position: ${position}, invocations: ${count}`)
  return result
}

export default calculateFib