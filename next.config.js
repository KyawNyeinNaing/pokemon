/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['images.pokemontcg.io'],
  },
};

module.exports = nextConfig;
