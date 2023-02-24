/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  /* add github hostnames to the list of allowed hosts */
  images: {
    domains: ['https://github.com', 'https://githubusercontent.com/' ],
  },
}