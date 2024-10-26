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
  {
    protocol: "https",
    hostname: "res.cloudinary.com",
    pathname: "/dgq9fqtni/image/fetch/**",
  }
],
    },
  
  }

 
 
  
  module.exports = nextConfig
  
