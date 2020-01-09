import express from '@supergeneric/express'

const app = express()

console.log('express app loaded...', { app })
app.start()