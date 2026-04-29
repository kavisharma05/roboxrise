/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wubflow-shield.NOCODEXPORT.DEV',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
