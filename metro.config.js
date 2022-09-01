// workaround for v3.5.0
// https://github.com/apollographql/apollo-client/releases
const defaultSourceExts =
  require("metro-config/src/defaults/defaults").sourceExts;
module.exports = {
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: process.env.RN_SRC_EXT
      ? [...process.env.RN_SRC_EXT.split(",").concat(defaultSourceExts), "cjs"] // <-- cjs added here
      : [...defaultSourceExts, "cjs"], // <-- cjs added here
  },
};
