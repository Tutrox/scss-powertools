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
  stylelint.lint({ config: { extends: ["stylelint-config-standard", "stylelint-config-recommended-scss"] }, files: input, syntax: "scss" })
    .then(result => {
      if (result.errored) {
        logger.error(result.output, "lint", true);
      } else {
        logger.success("Lint succeeded!", "lint");
      }
    })
    .catch(error => {
      logger.error(error, "lint");
    });
}

/**
 * Compiles SCSS to CSS
 * @param {string} input The input SCSS
 * @param {cssCallback} callback The output CSS
 * @private
 */
function compile(input, callback) {
  scss.render({
    file: input,
    includePaths: ["node_modules"],
    outFile: logger.getConfig("output"),
    outputStyle: "expanded",
    precision: 6,
    sourceMapEmbed: true
  }, (error, result) => {
    if (error) {
      logger.error(`Message: ${error.message} Status code: ${error.status}`, "compile");
    } else {
      callback(result.css);
    }
  });
}

/**
 * Adds CSS vendor prefixes
 * @param {string} input The input CSS
 * @param {cssCallback} callback The output CSS
 * @private
 */
function prefix(input, callback) {
  postcss([autoprefixer])
    .process(input, {
      from: logger.getConfig("input"),
      to: logger.getConfig("output"),
      map: { inline: true }
    })
    .then((result, error) => {
      if (error) {
        logger.error(error, "prefix");
      } else {
        callback(result.css);
      }
    })
    .catch(error => {
      logger.error(error, "prefix");
    });
}

/**
 * Minifies the CSS
 * @param {string} input The input CSS
 * @param {cssCallback} callback The output CSS
 * @private
 */
function minify(input, callback) {
  new cleancss({ returnPromise: true })
    .minify(input)
    .then(result => {
      callback(result.styles);
    })
    .catch(error => {
      logger.error(error, "minify");
    });
}

/**
 * Writes the CSS to the filesystem
 * @param {string} input The input CSS
 * @param {string} output The output CSS path
 * @private
 */
function write(input, output) {
  fs.outputFile(output, input)
    .then(() => {
      logger.success("Your CSS is done!", "scss-powertools");
    })
    .catch(error => {
      logger.error(error, "fs (outputFile)");
    });
}

module.exports = {
  lint,
  compile,
  prefix,
  minify,
  write
};