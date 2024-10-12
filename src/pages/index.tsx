import React from 'react';
import Header from '../components/Header';
import MarkerUpload from '../components/MarkerUpload';
import OutputUpload from '../components/OutputUpload';
import PreviewSection from '../components/PreviewSection';
import QRGenerator from '../components/QRGenerator';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Web AR Platform</h1>
        <MarkerUpload />
        <OutputUpload />
        <PreviewSection />
        <QRGenerator experienceId="sample-id" />
      </main>
    </div>
  );
};

export default Home;