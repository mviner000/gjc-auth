/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        // We allow SVGs to be used as images
        dangerouslyAllowSVG: true,
        // We add it to the remote pattern for the static images we use from GitHub
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.imgur.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'img.icons8.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
