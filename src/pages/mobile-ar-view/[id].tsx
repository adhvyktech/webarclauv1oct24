import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const MobileARView: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [experience, setExperience] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/getExperience?id=${id}`)
        .then(res => res.json())
        .then(data => setExperience(data))
        .catch(err => console.error('Error fetching experience:', err));
    }
  }, [id]);

  if (!experience) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Head>
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        vr-mode-ui="enabled: false"
      >
        <a-marker type="pattern" url={experience.pattUrl}>
          <a-entity
            position="0 0 0"
            scale={`${experience.scale} ${experience.scale} ${experience.scale}`}
            rotation={`${experience.rotation.x} ${experience.rotation.y} ${experience.rotation.z}`}
          >
            {experience.outputUrl.endsWith('.glb') || experience.outputUrl.endsWith('.gltf') ? (
              <a-gltf-model src={experience.outputUrl}></a-gltf-model>
            ) : experience.outputUrl.endsWith('.mp4') ? (
              <a-video src={experience.outputUrl} width="2" height="1.5"></a-video>
            ) : (
              <a-image src={experience.outputUrl} width="2" height="2"></a-image>
            )}
          </a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </>
  );
};

export default MobileARView;