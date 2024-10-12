import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { generatePattFile } from '../../utils/arUtils';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public', 'uploads');
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const file = files.marker as formidable.File;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const oldPath = file.filepath;
    const newPath = path.join(form.uploadDir, file.originalFilename || 'marker.png');
    fs.renameSync(oldPath, newPath);

    try {
      const pattFile = await generatePattFile(newPath);
      const pattPath = path.join(form.uploadDir, 'marker.patt');
      fs.writeFileSync(pattPath, pattFile);

      res.status(200).json({ 
        message: 'Marker uploaded and .patt file generated',
        markerUrl: `/uploads/${path.basename(newPath)}`,
        pattUrl: '/uploads/marker.patt'
      });
    } catch (error) {
      console.error('Error generating .patt file:', error);
      res.status(500).json({ message: 'Error generating .patt file' });
    }
  });
}