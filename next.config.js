/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
  
    images: {
     
remotePatterns: [
  {
    protocol: "https",
    hostname: "replicate.com",
  },
  {
    protocol: "https",
    hostname: "replicate.delivery",
  },
],
    },
  
  }

 
 
  
  module.exports = nextConfig
  
