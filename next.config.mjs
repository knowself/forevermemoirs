/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Case-insensitive short link: /Grandma -> /grandma -> Amazon
      // (video viewers often capitalize the first letter)
      {
        source: '/Grandma',
        destination: '/grandma',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
