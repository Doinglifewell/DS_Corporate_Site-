/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'ALLOWALL' },
        { key: 'Content-Security-Policy', value: "frame-ancestors *" },
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    }]
  },
  // Disable Next.js default security headers that block iframing
  poweredByHeader: false,
}
module.exports = nextConfig
