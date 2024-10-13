import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), 'public', 'uploads'),
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const file = files.output as formidable.File;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const oldPath = (file as any).path;
    const newPath = path.join((form as any).uploadDir, (file as any).originalFilename || 'output');
    fs.renameSync(oldPath, newPath);

    res.status(200).json({ 
      message: 'Output file uploaded successfully',
      outputUrl: `/uploads/${path.basename(newPath)}`
    });
  });
}