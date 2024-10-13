import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
// Removed the problematic import for ARButton

const PreviewSection: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('ar-preview')?.appendChild(renderer.domElement);

    // Add AR content (placeholder cube for demonstration)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // AR setup
    renderer.xr.enabled = true;
    document.body.appendChild(ARButton.createButton(renderer));

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Apply transformations
      cube.scale.set(scale, scale, scale);
      cube.rotation.set(rotationX, rotationY, rotationZ);
      cube.position.set(tiltX, tiltY, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      document.getElementById('ar-preview')?.removeChild(renderer.domElement);
    };
  }, [scale, rotationX, rotationY, rotationZ, tiltX, tiltY]);

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">AR Preview</h2>
      <div id="ar-preview" className="w-full h-64 bg-gray-200"></div>
      <div className="mt-4 space-y-2">
        <div>
          <label htmlFor="scale">Scale: </label>
          <input
            type="range"
            id="scale"
            min="0.1"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotationX">Rotation X: </label>
          <input
            type="range"
            id="rotationX"
            min="0"
            max="6.28"
            step="0.1"
            value={rotationX}
            onChange={(e) => setRotationX(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotationY">Rotation Y: </label>
          <input
            type="range"
            id="rotationY"
            min="0"
            max="6.28"
            step="0.1"
            value={rotationY}
            onChange={(e) => setRotationY(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotationZ">Rotation Z: </label>
          <input
            type="range"
            id="rotationZ"
            min="0"
            max="6.28"
            step="0.1"
            value={rotationZ}
            onChange={(e) => setRotationZ(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="tiltX">Tilt X: </label>
          <input
            type="range"
            id="tiltX"
            min="-2"
            max="2"
            step="0.1"
            value={tiltX}
            onChange={(e) => setTiltX(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="tiltY">Tilt Y: </label>
          <input
            type="range"
            id="tiltY"
            min="-2"
            max="2"
            step="0.1"
            value={tiltY}
            onChange={(e) => setTiltY(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;