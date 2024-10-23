import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel.js"
import { secretKey } from "../utils/constant.js";
import { sendEmail } from "../utils/sendMail.js";

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


        // JSON Web Token

        let infoObj = {
            _id: result._id,
        };

        let expiryInfo = {
            expiresIn:'1d',
        }

        let token = jwt.sign(infoObj,secretKey,expiryInfo);


        await sendEmail({
            to:data.email,
            subject:"Account Registration",
            html:`<h1>Your account has been created successfully</h1>

            <a href="http://localhost:5173/verify-email?token=${token}">
            
            http://localhost:5173/verify-email?token=${token}`,
        })

        res.status(201).json({
            success: true,
            message: "User register successfully. Please check your email to verify your account",
            data: result
        })
    } catch (error) {
    //   res.status(400).json({
    //     success:false,
    //     message:error.message
    //   })
    next(error)
    }
}

export let verifyEmail = async(req, res, next) => {
    try {

        // Get Token

        let tokenString = req.headers.authorization;
        let tokenArray = tokenString.split(" ");
        let token = tokenArray[1];

        // verify token 
        let infoObj = await jwt.verify(token, secretKey);
        let userId = infoObj._id;

        let result = await userModel.findByIdAndUpdate(userId, {
            isVerification: true,
        });
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            result: result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,

        })
    }
}