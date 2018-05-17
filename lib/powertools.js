const util = require("./util");
const logger = require("./logger");

/**
 * The main function that will process your SCSS and finally output it
 * @param {string} input The input SCSS path
 * @param {string} output The output CSS path
 * @private
 */
function powerTools(input, output) {
  //Start lint
  util.lint(input);
  //While linting start the SCSS processing
  util.compile(input, css => {
    util.prefix(css, css => {
      if (logger.getConfig("production") || logger.getConfig("separate") || logger.getConfig("minify")) {
        if (logger.getConfig("separate")) util.write(css, output);
        util.minify(css, css => {
          //Minified
          util.write(css, logger.getConfig("separate") ? output.replace(/\.css$/, ".min.css") : output);
        });
      } else {
        //Unminified
        util.write(css, output);
      }
    });
  });
}

module.exports = powerTools;
