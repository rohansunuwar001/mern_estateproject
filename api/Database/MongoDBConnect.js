import mongoose from "mongoose";

export let connectDB = () => {

    // mongoose.connect(process.env.MONGO).then(() => {
    //     console.log("Connected to MongoDB Successfully!");
    // }
    // ).catch((err) => {
    //     console.log(err);
    // }
    // );




    try {
        mongoose.connect("mongodb://localhost:27017/mern-estate");
        console.log("Connected Successfully!");  
    } catch (error) {
        console.log(error)
    }
}
