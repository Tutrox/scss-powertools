const stylelint = require("stylelint");
const scss = require("node-sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cleancss = require("clean-css");
const fs = require("fs-extra");
const logger = require("./logger");

/**
 * Callback with processed CSS
 * @callback cssCallback
 * @param {string} css The processed CSS
 */

/**
 * Lints the SCSS
 * @param {string} input The input SCSS
 * @private
 */
function lint(input) {
  stylelint.lint({config: {extends: ["stylelint-config-standard", "stylelint-config-recommended-scss"]}, files: input, syntax: "scss"})
    .then(result => {
      if (result.errored) {
        logger.error(result.output, "lint", input, true);
      }
    })
    .catch(error => {
      logger.error(error, "lint", input);
    });
}

/**
 * Compiles SCSS to CSS
 * @param {string} input The input SCSS
 * @param {object} paths Input and output paths
 * @param {cssCallback} callback The output CSS
 * @private
 */
function compile(input, paths, callback) {
  scss.render({
    file: input,
    includePaths: ["node_modules"],
    outFile: paths.output,
    outputStyle: "expanded",
    precision: 6,
    sourceMapEmbed: true
  }, (error, result) => {
    if (error) {
      logger.error(`Message: ${error.message} Status code: ${error.status}`, "compile", paths.input);
    } else {
      callback(result.css);
    }
  });
}

/**
 * Adds CSS vendor prefixes
 * @param {string} input The input CSS
 * @param {object} paths Input and output paths
 * @param {cssCallback} callback The output CSS
 * @private
 */
function prefix(input, paths, callback) {
  postcss([autoprefixer])
    .process(input, {
      from: paths.input,
      to: paths.output,
      map: {inline: true}
    })
    .then((result, error) => {
      if (error) {
        logger.error(error, "prefix", paths.input);
      } else {
        callback(result.css);
      }
    })
    .catch(error => {
      logger.error(error, "prefix", paths.input);
    });
}

/**
 * Minifies the CSS
 * @param {string} input The input CSS
 * @param {object} paths Input and output paths
 * @param {cssCallback} callback The output CSS
 * @private
 */
function minify(input, paths, callback) {
  new cleancss({returnPromise: true})
    .minify(input)
    .then(result => {
      callback(result.styles);
    })
    .catch(error => {
      logger.error(error, "minify", paths.input);
    });
}

/**
 * Writes the CSS to the filesystem
 * @param {string} input The input CSS
 * @param {object} paths Input and output paths
 * @private
 */
function write(input, paths) {
  fs.outputFile(paths.output, input)
    .then(() => {
      logger.success(`${paths.output} is done!`, "scss-powertools");
    })
    .catch(error => {
      logger.error(error, "file output", paths.input);
    });
}

module.exports = {
  lint,
  compile,
  prefix,
  minify,
  write
};