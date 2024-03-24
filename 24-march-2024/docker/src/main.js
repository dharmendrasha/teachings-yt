const Express = require('express')

const { env } = process

const PORT = env['PORT'] || 3000

const app = Express()

app.all('/', (req, res) => {
    res.send("hello world")
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`express in docker volume server is running on PORT=${PORT}`)
})