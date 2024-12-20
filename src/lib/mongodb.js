import mongoose from "mongoose";

export const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB connected Successfully");
    } catch (error) {
        console.log(error);
    }
}