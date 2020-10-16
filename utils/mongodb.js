import { MongoClient } from "mongodb";

/* eslint-disable no-undef */
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
/* eslint-enable no-undef */

let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!dbName) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
