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
    },
    role: {
        type: String,
        required: [true, "role is required"]
    },
    isVerification: {
        type: Boolean,
        required: [true, "verification is required"]
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
},{timestamps:true});

export default createUserSchema;