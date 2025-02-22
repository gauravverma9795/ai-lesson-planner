/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
}

module.exports = nextConfig