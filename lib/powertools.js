const path = require("path");
const util = require("./util");
const logger = require("./logger");

/**
 * The main function that will process your SCSS and finally output it
 * @param {string} input The input SCSS path
 * @param {string} output The output CSS path
 * @private
 */
function powerTools(input, output) {
  //Magic output name generator
  if (logger.config.directory) {
    output = `${logger.config.directory}/${path.basename(input).replace(/\.scss$/, ".css")}`;
  }
  //Set paths to an object for easy use
  let paths = {input, output};
  //Start lint
  util.lint(input);
  //While linting start the SCSS processing
  util.compile(input, paths, css => {
    util.prefix(css, paths, css => {
      if (logger.config.production || logger.config.separate || logger.config.minify) {
        if (logger.config.separate) util.write(css, output);
        util.minify(css, css => {
          //Minified
          util.write(css, logger.config.separate ? output.replace(/\.css$/, ".min.css") : output);
        });
      } else {
        //Unminified
        util.write(css, output);
      }
    });
  });
}

module.exports = powerTools;
