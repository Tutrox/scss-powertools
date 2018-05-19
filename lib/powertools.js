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
  input.forEach(internalInput => {
    //Magic output name generator
    let internalOutput = logger.config.directory ? `${logger.config.directory}/${path.basename(internalInput).replace(/\.scss$/, ".css")}` : output;
    //Set paths to an object for easy use
    let paths = {input: internalInput, output: internalOutput};
    //Start lint
    util.lint(internalInput);
    //While linting start the SCSS processing
    util.compile(internalInput, paths, css => {
      util.prefix(css, paths, css => {
        if (logger.config.production || logger.config.separate || logger.config.minify) {
          if (logger.config.separate) util.write(css, paths);
          util.minify(css, paths, css => {
            //Minified
            util.write(css, {input: internalInput, output: logger.config.separate ? internalOutput.replace(/\.css$/, ".min.css") : internalOutput});
          });
        } else {
          //Unminified
          util.write(css, paths);
        }
      });
    });
  });
}

module.exports = powerTools;
