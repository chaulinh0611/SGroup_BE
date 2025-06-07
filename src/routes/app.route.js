import express from 'express';
import ValidateMiddleware from "../middleware/validate.middleware.js";
import verifyMiddleware from '../middleware/verify.middleware.js';

const router = express.Router();
import userController from '../controllers/user.controllers.js';
import pollController from '../controllers/poll.controllers.js';
import voteController from '../controllers/vote.controllers.js';
import { auth, isAdmin } from '../middleware/auth.middleware.js';

// Poll 
router.post('/polls', auth, isAdmin, pollController.createPoll);
router.get('/polls', auth, pollController.getAllPolls);
router.get('/polls/:id', auth, pollController.getPollById);
router.put('/polls/:id', auth, isAdmin, pollController.updatePoll);
router.delete('/polls/:id', auth, isAdmin, pollController.deletePoll);
router.patch('/polls/:id/lock', auth, isAdmin, pollController.lockPoll);
router.patch('/polls/:id/unlock', auth, isAdmin, pollController.unlockPoll);
router.post('/polls/:id/options', auth, isAdmin, pollController.addOption);
router.delete('/polls/:id/options/:optionId', auth, isAdmin, pollController.removeOption);

// Vote 
router.post('/polls/:id/vote/:optionId', auth, voteController.vote);
router.post('/polls/:id/unvote/:optionId', auth, voteController.unvote);

// Auth
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.get("/auth/getMe", verifyMiddleware.checkAuth,userController.getMe);
router.put("/auth/updateMe", verifyMiddleware.checkAuth, ValidateMiddleware.validateName,ValidateMiddleware.validateEmail, userController.updateProfile);
router.post("/forgotPassword", ValidateMiddleware.validateEmail, userController.forgotPassword);
router.post("/resetPassword", userController.resetPassword);

// User 
router.post("/",auth, isAdmin, ValidateMiddleware.validateName, ValidateMiddleware.validateEmail, userController.createUser);
router.get("/",auth, isAdmin, userController.getAllUsers);
router.get("/:id",auth, isAdmin, userController.getUser);
router.put("/:id",auth, isAdmin, ValidateMiddleware.validateName, userController.updateUser);
router.delete("/:id",auth, isAdmin, userController.deleteUser);

export default router;
