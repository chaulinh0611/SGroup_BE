import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";

const route = Router();

route.route('/')
    .get(UserController.getAll)
    .post(UserController.postUser);

route.route('/:id')
    .get(UserController.getUser)
    .put(UserController.putUser)
    .delete(UserController.deleteUser);

export default route;
