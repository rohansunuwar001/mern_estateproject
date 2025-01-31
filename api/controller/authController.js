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


        res.status(200).json({
            success:true,
            message:"User Login Successfully",
            data:validUser,
            token:token
        })
    } catch (error) {
        next(error)
    }
}


export const google = async (req, res, next) => {
    try {
      // Look for the user by email
      const validUser = await userModel.findOne({ email: req.body.email });
  
      if (validUser) {
        // User exists, create JWT token
        let infoObj = { id: validUser._id };
        let expiryInfo = { expiresIn: '12h' };
  
        // Create token
        const token = jwt.sign(infoObj, secretKey, expiryInfo);
  
        // Destructure the password out of the user data
        const { password: pass, ...rest } = validUser._doc;
  
        // Set the token as a cookie and return user data
        res.status(200).json({
            success:true,
            message:"User Login Successfully",
            data:validUser,
            token:token

        });
      } else {
        // User doesn't exist, create a new user
        const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatePassword, 10);
  
        const newUser = await userModel.create({
          username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          role: 'user',
          isVerification: true,
          avatar: req.body.photo,
        });
  
  
        // Create JWT token for new user
        let infoObj = { id: newUser._id };
        let expiryInfo = { expiresIn: '12h' };
  
        const token = jwt.sign(infoObj, secretKey, expiryInfo);
  
        // Destructure the password and return the rest of the user data
        const { password: pass, ...rest } = newUser._doc;
  
        // Set the token as a cookie and return user data
        res.status(200).json({
            success:true,
            message:"Successfully Logged in",
            data:newUser,
            token:token,
        });
  
        // Send welcome email
        await sendEmail({
          to: req.body.email,
          subject: 'Account Registration',
          html: `<h1>Your account has been created successfully. Thank you for using our website</h1>`,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

   export let profile = async (req,res,next) => {
     try {
        const id = req._id;
        const result = await userModel.findById(id);
        res.status(200).json({
            success:true,
            message:"Profile found successffully",
            data:result
        })
     } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
     }
   }
   



  export let updateUserControllor = async(req, res, next) => {
    try {
        let result = await userModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.json({
          success: true,
          message: "User updated successfully",
          data: result,
        });
      } catch (error) {
        res.json({
          success: false,
          message: error.message,
        });
      }
}

export let deleteUserControllor = async(req, res, next) => {
    try {
        let result = await userModel.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Web User Delete successfully",
            data: result,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}