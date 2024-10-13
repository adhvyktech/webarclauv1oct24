const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        // Add other Node.js built-in modules here as needed
      };
    }

    config.module.rules.push({
      test: /node_modules\/aframe\/dist\/aframe-master\.js/,
      use: [
        {
          loader: 'imports-loader',
          options: {
            imports: [
              'path=./aframe-polyfill.js',
            ],
          },
        },
      ],
    });

    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
