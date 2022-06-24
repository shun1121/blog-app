/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com', 'ik.imagekit.io'],
  },
}

module.exports = nextConfig
