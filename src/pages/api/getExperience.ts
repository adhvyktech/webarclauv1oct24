import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../utils/dbUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid experience ID' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('arExperiences');

    const experience = await collection.findOne({ _id: new ObjectId(id) });

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json(experience);
  } catch (error) {
    console.error('Error retrieving AR experience:', error);
    res.status(500).json({ message: 'Error retrieving AR experience' });
  }
}