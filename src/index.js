import express from "express"

import router from "./routes/app.route.js"
import errorHandler from "./middleware/errorHandle.middleware.js"

const app = express()
const port = 3000

app.use(express.json())

app.use("/", router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port `);
})
