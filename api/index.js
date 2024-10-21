import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./Database/MongoDBConnect.js";
dotenv.config();
const app = express();
connectDB();
const port = 3000;


// app.get('/', (req, res, next) => {
//     res.json("Connected Successfully")
// })

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
}
)