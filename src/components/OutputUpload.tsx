import React, { useState } from 'react';
import axios from 'axios';

const OutputUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('output', file);

    try {
      const response = await axios.post('/api/uploadTarget', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedFile(response.data.file);
    } catch (error) {
      console.error('Error uploading output file:', error);
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">Upload Output File</h2>
      <input
        type="file"
        accept="image/*,video/*,.glb,.gltf"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={!file}
      >
        Upload Output
      </button>
      {uploadedFile && (
        <p className="mt-2">
          File uploaded: {uploadedFile}
        </p>
      )}
    </div>
  );
};

export default OutputUpload;