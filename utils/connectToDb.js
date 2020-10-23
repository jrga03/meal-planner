import mongoose from "mongoose";

/* eslint-disable no-undef */
const uri = process.env.MONGODB_URI;
/* eslint-enable no-undef */

let isConnected = false;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export default async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  isConnected = db.connections[0].readyState;
}
