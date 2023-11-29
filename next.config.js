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
      domains: [
       
        "oaidalleapiprodscus.blob.core.windows.net",
        "cdn.openai.com"
      ]
    },
  
  }

 
  
  module.exports = nextConfig
  
