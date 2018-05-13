const util = require("./util");
const logger = require("./logger");

/**
 * The main function that will process your SCSS and finally output it
 * @param {string} input The input SCSS path
 * @private
 */
function powerTools(input) {
  //Start lint
  util.lint(input);
  //While linting start the SCSS processing
  util.compile(input, css => {
    util.prefix(css, css => {
      if (logger.getConfig("production") || logger.getConfig("minify")) {
        util.minify(css, css => {
          //Minified
          util.write(css);
        });
      } else {
        //Unminified
        util.write(css);
      }
    });
  });
}

module.exports = powerTools;
