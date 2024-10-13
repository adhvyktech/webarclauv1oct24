import React, { useEffect } from 'react';
import 'aframe';
import 'aframe-ar';

const ARViewer: React.FC = () => {
  useEffect(() => {
    // Ensure AFRAME is available before creating the scene
    if (typeof AFRAME !== 'undefined') {
      // Register any custom components here if needed
      // AFRAME.registerComponent('my-component', { ... });
    }
  }, []);

  return (
    <a-scene 
      embedded 
      arjs="sourceType: webcam; debugUIEnabled: false;"
      renderer="logarithmicDepthBuffer: true;"
      vr-mode-ui="enabled: false"
    >
      {/* Pre-load assets here */}

      <a-marker preset="hiro">
        <a-box 
          position="0 0.5 0" 
          material="color: yellow;" 
          animation__rotate="property: rotation; to: 0 360 0; loop: true; dur: 10000"
        ></a-box>
      </a-marker>

      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARViewer;
