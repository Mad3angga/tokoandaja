/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['onodvdjznqbbgddpqhjg.supabase.co', 'placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onodvdjznqbbgddpqhjg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
