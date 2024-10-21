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
    }
},{timestamps:true});

export default createUserSchema;