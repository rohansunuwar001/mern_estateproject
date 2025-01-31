import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import { connectDB } from "./Database/MongoDBConnect.js";
import { authRouter } from "./routes/authRoutes.js";
import fileRouter from "./routes/fileRouter.js";



dotenv.config();
const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(json()); // json() is already part of express
app.use(express.static('./api/public'));

// Route for the root
app.get('/', (req, res) => {
    res.json("Connected Successfully");
});

// Authentication routes
app.use("/api/auth", authRouter);
app.use('/file',fileRouter);


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message;
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
