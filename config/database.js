import mongoose from "mongoose";
let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("Already connected to database");
    return;
  }
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('mongoDB Connected...')
    connected = true;
    console.log("Connected to database...");
  } catch (error) {
    console.log("ERROR CONNECTING:", error.message);
  }

} 

export default connectDB;