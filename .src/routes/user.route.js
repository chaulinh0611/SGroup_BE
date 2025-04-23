import { Router } from "express";
import userController from "../controllers/user.controller.js";
import ValidateMiddleware from "../middleware/validate.middleware.js";

const route = Router();

route.post("/", ValidateMiddleware.validateName, ValidateMiddleware.validateEmail, userController.createUser);
route.get("/", userController.getAllUsers);
route.get("/:id", userController.getUser);
route.put("/:id", ValidateMiddleware.validateName, userController.updateUser);
route.delete("/:id", userController.deleteUser);

export default route;
