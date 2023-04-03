import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const options = {
  dbName: process.env.DB_NAME,
};

const connectDb = async (url) => {
  try {
    mongoose.connect(url, options);
    console.log("Connect Database successfully");
  } catch (error) {
    console.log("error => ", error);
  }
};

export { connectDb };
