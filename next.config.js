/** @type {import('next').NextConfig} */
require("dotenv").config;
const withPlugins = require("next-compose-plugins");
const withFonts = require("next-fonts");

const nextConfig = {
  reactStrictMode: true,
  env: {
    VALID_EMAIL: process.env.VALID_EMAIL,
    VALID_PASSWORD: process.env.VALID_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

// module.exports = withTM(nextConfig);

// module.exports = nextConfig;

module.exports = withPlugins([withFonts, nextConfig]);
