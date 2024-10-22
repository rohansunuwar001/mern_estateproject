import mongoose from "mongoose";
import createUserSchema from "../schema/userData.js";

export let userModel= mongoose.model("userModel",createUserSchema)