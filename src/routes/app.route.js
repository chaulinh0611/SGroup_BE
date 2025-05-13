import { Router } from "express"
import authRoute from "./auth.route.js"
//import userRoute from "./user.route.js"

const router = Router()
router.use("/auth", authRoute)
// router.use("/users", userRoute)

export default router
