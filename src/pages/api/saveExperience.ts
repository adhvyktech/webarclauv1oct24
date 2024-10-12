import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/dbUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { markerUrl, pattUrl, outputUrl, scale, rotation, tilt } = req.body;

    const { db } = await connectToDatabase();
    const collection = db.collection('arExperiences');

    const result = await collection.insertOne({
      markerUrl,
      pattUrl,
      outputUrl,
      scale,
      rotation,
      tilt,
      createdAt: new Date()
    });

    res.status(200).json({ 
      message: 'AR experience saved successfully',
      experienceId: result.insertedId
    });
  } catch (error) {
    console.error('Error saving AR experience:', error);
    res.status(500).json({ message: 'Error saving AR experience' });
  }
}