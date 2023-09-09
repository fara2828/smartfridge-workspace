const { getDefaultConfig } = require("@react-native/metro-config");
const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  };
  