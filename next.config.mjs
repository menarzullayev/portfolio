/**
 * Next.js sozlamalari.
 * NEXT_DIST_DIR — build natijasi qaysi papkaga yozilishi (standart: .next).
 */
const distDir = process.env.NEXT_DIST_DIR || '.next';

const nextConfig = {
  distDir,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
