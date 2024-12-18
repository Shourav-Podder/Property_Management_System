/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.ibb.co', // Corrected domain
          port: '',
          pathname: '/**', // This allows all paths under the domain
        },
      ],
    },
  };
  
  export default nextConfig;
  