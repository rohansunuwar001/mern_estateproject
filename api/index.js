import dotenv from "dotenv";
import express, { json } from "express";
import { connectDB } from "./Database/MongoDBConnect.js";
import { authRouter } from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const port = 3000;


connectDB();
app.use(json());
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
}
)



app.use("/api/auth",authRouter);

app.use((err,req,res,next) => {
const statusCode = err.statusCode || 500;
const message = err.message || 'Internal Server Error';
return res.status(statusCode).json({
    success:false,
    statusCode,message
})  
}
)