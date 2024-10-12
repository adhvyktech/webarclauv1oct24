import { MongoClient, Db } from 'mongodb';

let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ db: Db }> {
  if (cachedDb) {
    return { db: cachedDb };
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  const db = client.db(process.env.MONGODB_DB);

  cachedDb = db;
  return { db };
}