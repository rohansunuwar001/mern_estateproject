import { Router } from "express";
import { createUserController, signin, verifyEmail } from "../controller/authController.js";


 export let authRouter = Router();
 authRouter.route("/signup").post(createUserController);
 authRouter.route("/verify-email").post(verifyEmail);
 authRouter.route("/signin").post(signin)