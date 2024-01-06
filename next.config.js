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
      ],
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

  async redirects() {
    return [
      {
        source: 'https://ia-prokit.vercel.app',
        destination: 'https://www.iaprokit.com.br/',
        permanent: true,
      },
    ]
  },
 
  
  module.exports = nextConfig
  
