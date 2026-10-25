/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // The browser calls /api on the same site, Next.js forwards it to the backend.
  // That way the login cookie belongs to the frontend domain and proxy.js can see it.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL || "http://localhost:5000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
