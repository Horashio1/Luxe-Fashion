/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // Disable Next.js image optimization
    domains: ['images.unsplash.com', 'zblcuanueeturnsmzlzy.supabase.co'],
  },
};

module.exports = nextConfig;