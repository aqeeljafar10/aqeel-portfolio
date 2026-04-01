/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required for Sanity Studio embedded at /studio
  transpilePackages: ['next-sanity'],
}

export default nextConfig
