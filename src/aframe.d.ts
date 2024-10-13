import 'aframe';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-entity': any;
      'a-marker': any;
      'a-box': any;
      'a-gltf-model': any;
      'a-video': any;
      'a-image': any;
    }
  }
}

declare module 'aframe-ar';
