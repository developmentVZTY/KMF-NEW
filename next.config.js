/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;

    // NOTE: this rule previously sat in an object literal that also declared
    // `test: /\.(mp4|webm)$/` and a second `use` key. Duplicate keys mean the
    // later ones win, so only the PDF rule below was ever active. Videos are
    // referenced by path from /public and never imported, so no video rule is
    // needed. Kept as-is to preserve existing build output exactly.
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'pdfs/',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
