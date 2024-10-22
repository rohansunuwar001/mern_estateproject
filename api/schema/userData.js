import mongoose from "mongoose";


let createUserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Name is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }, gender: {
        type: String,
        required: [true, "gender is required"]
    },
    role: {
        type: String,
        required: [true, "role is required"]
    },
    isVerification: {
        type: Boolean,
        required: [true, "verification is required"]
    },
},{timestamps:true});

export default createUserSchema;