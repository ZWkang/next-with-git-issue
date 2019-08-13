const cssLoaderConfig = require("@zeit/next-css/css-loader-config");

const withCSS = require("@zeit/next-css");
// const issue = require("./issue.json");

// var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = (nextConfig = {}) => {
  return withCSS(
    Object.assign({}, nextConfig, {
      webpack(config, options) {
        if (!options.defaultLoaders) {
          throw new Error(
            "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
          );
        }

        const { dev, isServer } = options;
        const {
          cssModules,
          cssLoaderOptions,
          postcssLoaderOptions,
          sassLoaderOptions = {}
        } = nextConfig;

        options.defaultLoaders.sass = cssLoaderConfig(config, {
          extensions: ["scss", "sass"],
          cssModules,
          cssLoaderOptions,
          postcssLoaderOptions,
          dev,
          isServer,
          loaders: [
            {
              loader: "sass-loader",
              options: sassLoaderOptions
            }
          ]
        });
        // config.plugins.push(new BundleAnalyzerPlugin());
        config.module.rules.push(
          {
            test: /\.scss$/,
            use: options.defaultLoaders.sass
          },
          {
            test: /\.sass$/,
            use: options.defaultLoaders.sass
          }
        );

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      }
      // exportPathMap() {
      //   const postList = Object.keys(issue);

      //   // tranform the list of posts into a map of pages with the pathname `/post/:id`
      //   const pages = postList.reduce(
      //     (pages, post) =>
      //       Object.assign({}, pages, {
      //         [`/detail/${post}`]: {
      //           page: "/detail/[id]"
      //         }
      //       }),
      //     {}
      //   );

      //   // combine the map of post pages with the home
      //   return Object.assign({}, pages, {
      //     "/": { page: "/" }
      //   });
      // }
    })
  );
};
