/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/user',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
