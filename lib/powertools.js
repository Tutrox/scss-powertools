var stylelint = require("stylelint");
var scss = require("node-sass");
var postcss = require("postcss");
var autoprefixer = require("autoprefixer");
var cleancss = require("clean-css");
var fs = require("fs");
var logger = require("./logger");

var css;

function powerTools(input, output){
  stylelint.lint({config: {extends: ["stylelint-config-standard", "stylelint-config-recommended-scss"]}, files: input, syntax: "scss"})
    .then(result => {
      if (result.errored){
        logger.error(result.output, "lint");
      } else{
        logger.success("Lint succeeded!", "lint");
      }
    })
    .catch(error => {
      logger.error(error, "lint");
    });
  scss.render({
    file: input,
    includePaths: ["node_modules"],
    outFile: output,
    outputStyle: "expanded",
    precision: 6,
    sourceMapEmbed: true
  }, (error, result) => {
    if (error){
      logger.error(`Message: ${error.message} Status code: ${error.status}`, "compile");
    } else{
      css = result.css;
      postcss([autoprefixer])
        .process(css, {
          from: input,
          to: output,
          map: {inline: true}
        })
        .then((result, error) => {
          if (error){
            logger.error(error, "prefix");
          } else{
            if (logger.getConfig("production") || logger.getConfig("minify")){
              new cleancss({returnPromise: true})
                .minify(css)
                .then(result => {
                  css = result.styles;
                  fs.writeFile(output, css, error => {
                    if (error){
                      logger.error(error);
                    } else{
                      logger.success("Your CSS is done!", "scss-powertools");
                    }
                  });
                })
                .catch(error => {
                  logger.error(error, "minify");
                });
            } else{
              fs.writeFile(output, css, error => {
                if (error){
                  logger.error(error);
                } else{
                  logger.success("Your CSS is done!", "scss-powertools");
                }
              });
            }
          }
        })
        .catch(error => {
          logger.error(error, "prefix");
        });
    }
  });
}

module.exports = powerTools;
