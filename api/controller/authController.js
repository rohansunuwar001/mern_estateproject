import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel.js";
import { secretKey } from "../utils/constant.js";
import { sendEmail } from "../utils/sendMail.js";
import { errorHandler } from "../utils/error.js";

export let createUserController = async (req, res, next) => {
    try {
        // Getting data from front end
        const { username, email, password } = req.body;



        // Check if the email already exists
        const existingUsername = await userModel.findOne({username});
        if(existingUsername){
            return res.status(400).json({
                success:false,
                message:"Username already exists"
            })
        }
        // Check if the email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hashing the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user data
        const userData = {
            username,
            email,
            password: hashedPassword,
            role:'user',
            isVerification: false
        };

        // Create new user
        const result = await userModel.create(userData);

        // JSON Web Token
        const infoObj = { _id: result._id };
        const token = jwt.sign(infoObj, secretKey, { expiresIn: '1d' });

        // Send verification email
        await sendEmail({
            to: email,
            subject: "Account Registration",
            html: `<h1>Your account has been created successfully</h1>
                   <a href="http://localhost:5173/verify-email?token=${token}">
                   Verify your email</a>`,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully. Please check your email to verify your account",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
        // Optional: Pass the error to the next middleware for logging
        // next(error);
    }
};

export let verifyEmail = async (req, res, next) => {
    try {
        // Get Token
        const tokenString = req.headers.authorization;
        const token = tokenString.split(" ")[1];

        // Verify token 
        const infoObj = jwt.verify(token, secretKey);
        const userId = infoObj._id;

        const result = await userModel.findByIdAndUpdate(userId, { isVerification: true });

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            result: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const signin = async (req,res,next) => {
    try {
        const {email, password} = req.body;
        // For email exists or not 
        let validUser = await userModel.findOne({
            email:email
        })
        // For user is exists or not 
        if(!validUser){
            return res.status(404).json({
                success:false,
                message:"User not found. Please signup first to became our user."
            })
        }
        // if user is valid or not
        if(!validUser.isVerification){
            return res.status(401).json({
                success:false,
                message:"Email isn't verified. Please verify your email first."
            })
        }

        // for password valid or not 

        let isValidPassword = await bcrypt.compare(password,validUser.password);

        // If password is correct or not
        if(!isValidPassword){
            return res.status(401).json({
                success:false,
                message:"Password is incorrect. Please check your password."
            })
        }
        


        // For JSON WEB TOKEN (JWT needs 3 things (id,secretkey,expiryInfo))
        let infoObj = {
            id: validUser._id
        }
        let expiryInfo={
            expiresIn:'12h'
        }

        // generating the token from jwt
        let token = await jwt.sign(infoObj,secretKey,expiryInfo);


        // remvoing the hashed password from the output
        const {
            password:pass, ...rest
         } = validUser._doc;




        // adding cookie in response


        res.cookie('access_token',token,{httpOnly:true}).status(200).json({
            success:true,
            message:"User Login Successfully",
            data:rest,
            token:token
        })
    } catch (error) {
        next(error)
    }
}
