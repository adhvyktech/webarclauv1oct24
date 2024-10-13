import dynamic from 'next/dynamic';

const ARComponentWithNoSSR = dynamic(
  () => import('./ARComponentImplementation'),
  { ssr: false }
);

export default ARComponentWithNoSSR;
