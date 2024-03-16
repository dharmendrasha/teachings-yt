import express from "express";
import { PORT } from "./config.js";

const app = express()

app.get('/', (_, res) => {
    res.send("working!!! :)")
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is running on port=${PORT} please go to http://0.0.0.0:${PORT}`)
})
