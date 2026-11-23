import mongoose from 'mongoose';

let connected = false;

const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (connected) {
    console.log('MongoDB is already connected...');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
