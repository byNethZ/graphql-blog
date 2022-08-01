import mongoose from "mongoose";

const connectDB = async () =>{
    await mongoose.connect('mongodb://localhost/blogdb');
    console.log('MongoDB Conected')
}

export default connectDB;