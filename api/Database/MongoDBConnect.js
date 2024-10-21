import mongoose from "mongoose";

export let connectDB = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to MongoDB Successfully!");
    }
    ).catch((err) => {
        console.log(err);
    }
    );
}
