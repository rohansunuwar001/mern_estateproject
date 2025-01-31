import { Router } from "express";
import { createUserController,  deleteUserControllor,  google, profile, signin, updateUserControllor, verifyEmail } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


 export let authRouter = Router();
 authRouter.route("/signup").post(createUserController);
 authRouter.route("/verify-email").post(verifyEmail);
 authRouter.route("/signin").post(signin);
 authRouter.route("/google").post(google);
 authRouter.route('/profile').get(isAuthenticated,profile);
 authRouter.route('/update-profile/:id').patch(isAuthenticated,updateUserControllor);
 authRouter.route('/delete').delete(isAuthenticated,deleteUserControllor)