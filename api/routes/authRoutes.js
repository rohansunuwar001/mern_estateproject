import { Router } from "express";
import { createUserController } from "../controller/authController.js";


 export let authRouter = Router();
 authRouter.post("/signup",createUserController);