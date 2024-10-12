import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

interface QRGeneratorProps {
  experienceId: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ experienceId }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    // Generate the URL for the AR experience
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';
    setUrl(`${baseUrl}/mobile-ar-view/${experienceId}`);
  }, [experienceId]);

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">QR Code for AR Experience</h2>
      <div className="bg-white p-4 inline-block">
        <QRCode value={url} size={256} />
      </div>
      <p className="mt-2">Scan this QR code to view the AR experience on a mobile device.</p>
      <p className="mt-1">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Or click here to open the link
        </a>
      </p>
    </div>
  );
};

export default QRGenerator;