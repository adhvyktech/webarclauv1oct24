import React, { useEffect } from 'react';
import Head from 'next/head';

const ARViewer: React.FC = () => {
  useEffect(() => {
    // Load AR.js script
    const script = document.createElement('script');
    script.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
      </Head>
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-marker preset="hiro">
          <a-box position="0 0.5 0" material="color: yellow;"></a-box>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </>
  );
};

export default ARViewer;