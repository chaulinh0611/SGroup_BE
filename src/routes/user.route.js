import { Router } from "express"
import UserController from "../controllers/user.controller.js"
import ValidateMiddleware from "../middleware/validate.middleware.js"

const route = Router()
route.post("/", userController.createUser);
route.get("/", userController.getAllUsers);
route.get("/:id", ValidateMiddleware.validateId, userController.getUser);
route.put("/:id", ValidateMiddleware.validateId, userController.updateUser);
route.delete("/:id", ValidateMiddleware.validateId, userController.deleteUser);
export default route
