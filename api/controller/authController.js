import bcrypt from "bcryptjs";
import { userModel } from "../model/userModel.js"

export let createUserController = async (req, res, next) => {
    try {


        // Getting data from front end
        let data = req.body;

        // hashing the password 

        let hashedPassword = await bcrypt.hash(data.password, 10);

        data={
            ...data,
            isVerification:false,
            password:hashedPassword
        }

        let result = await userModel.create(data);
        res.status(201).json({
            success: true,
            message: "User Register Successfully",
            data: result
        })
    } catch (error) {
      next(error);
    }
}
