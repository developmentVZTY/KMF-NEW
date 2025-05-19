/** @type {import('next').NextConfig} */
const nextConfig = {
}

module.exports = nextConfig



module.exports = {
  
  
    webpack: (config) => {
      config.resolve.alias.canvas = false;
      config.module.rules.push({
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'pdfs/' // adjust the output path as needed
            }
          }
        ]
      });
      


  
      return config;
    },
  };