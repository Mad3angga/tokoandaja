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
  // This will tell Next.js to ignore TypeScript errors during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // This will tell ESLint to ignore errors during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
