import { Router } from "express";
import { createUserController, verifyEmail } from "../controller/authController.js";


 export let authRouter = Router();
 authRouter.route("/signup").post(createUserController);
 authRouter.route("/verify-email").post(verifyEmail);