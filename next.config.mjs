/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow isolated verification while a local dev server uses .next.
    distDir: process.env.NEXT_BUILD_DIR || '.next',
    images: {
    // unoptimized: true,
    domains: ['res.cloudinary.com'],
},
};

export default nextConfig;
