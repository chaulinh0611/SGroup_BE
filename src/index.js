import express from "express"
import routers from "./api/index.js"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", routers)

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
