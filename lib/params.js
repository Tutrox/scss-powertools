const sassConfig = config => ({
  file: config.input,
  includePaths: ["node_modules"],
  outFile: config.output,
  outputStyle: "expanded",
  sourceMapEmbed: true
});

const lintConfig = config => ({
  config: {
    extends: ["stylelint-config-standard", "stylelint-config-recommended-scss"]
  },
  files: config.input,
  formatter: "string",
  syntax: "scss"
});

const prefixConfig = config => ({
  from: config.input,
  to: config.output,
  map: {
    inline: true
  }
});

const minifyConfig = {
  returnPromise: true
};

module.exports = {
  sassConfig,
  lintConfig,
  prefixConfig,
  minifyConfig
};