import React, { useState } from 'react';
import axios from 'axios';

const MarkerUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pattFile, setPattFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('marker', file);

    try {
      const response = await axios.post('/api/uploadMarker', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPattFile(response.data.pattFile);
    } catch (error) {
      console.error('Error uploading marker:', error);
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">Upload Marker Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!file}
      >
        Upload Marker
      </button>
      {pattFile && (
        <p className="mt-2">
          .patt file generated: {pattFile}
        </p>
      )}
    </div>
  );
};

export default MarkerUpload;