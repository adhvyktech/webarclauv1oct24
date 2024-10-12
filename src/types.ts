export interface ARExperience {
    _id: string;
    markerUrl: string;
    pattUrl: string;
    outputUrl: string;
    scale: number;
    rotation: {
      x: number;
      y: number;
      z: number;
    };
    tilt: {
      x: number;
      y: number;
    };
    createdAt: Date;
  }