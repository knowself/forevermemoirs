/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Case-insensitive short link: any capitalization of /grandma
      // (e.g. /Grandma, /GRANDMA, /grandMa) -> /grandma -> Amazon.
      // Video viewers type what they see; the path is case-sensitive
      // by default, so match every letter in either case.
      {
        source: '/:g(G|g)(R|r)(A|a)(N|n)(D|d)(M|m)(A|a)',
        destination: '/grandma',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
