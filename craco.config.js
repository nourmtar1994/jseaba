const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#2b4fc2",
              "@link-color": "#2b4fc2",
              "@layout-header-background": "#1e8efb",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// *dark blue #15528d
