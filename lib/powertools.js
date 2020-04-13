const util = require("util");
const params = require("./params");

const postcss = require("postcss");
const sass = require("node-sass");
const style = require("stylelint");
const autoprefixer = require("autoprefixer");
const cleancss = require("clean-css");
const fs = require("fs-extra");

let current;
let currentMinified;

//Handle config.steps!!
//jsdoc!!
async function powertools(config, status) {
  try {
    const compiled = await util.promisify(sass.render)(params.sassConfig(config));
    current = compiled.css;
    status.succeed("compilation done");

    //Remove!!
    //console.log(compiled.css.toString("utf-8"));
  } catch (e) {
    return status.fail(`compilation failed | ${e.message}`);
  }

  try {
    status.start("linting");
    const linted = await style.lint(params.lintConfig(config));
    linted.output ? status.warn(`stylelint found issues: ${linted.output}`) : status.succeed("lint done (no issues detected)");
  } catch (e) {
    return status.fail(`linting failed, cannot proceed | ${e.message}`);
  }

  try {
    status.start("prefixing");
    const prefixed = await postcss([autoprefixer]).process(current, params.prefixConfig(config));
    current = prefixed.css;
    //Inform??
    status.succeed("prefixing done");

    //Remove!!
    //console.log(prefixed.css);
  } catch (e) {
    return status.fail(`prefixing failed, cannot proceed | ${e.name} | ${e.reason}`);
  }

  try {
    const minified = await new cleancss(params.minifyConfig).minify(current);
    currentMinified = minified.styles;
    //Inform efficiency!!
    status.succeed("minify done");

    //Remove!!
    //console.log(minified.styles);
  } catch (e) {
    return status.fail(`minify failed, cannot proceed | ${e.message}`);
  }

  try {
    const modeRule = config.production && !config.both;

    status.start(`writing your ${modeRule ? "minified" : "unminified"} css to disk`);
    await fs.outputFile(config.output, modeRule ? currentMinified : current);
    //Inform path!!
    status.succeed(`${modeRule ? "minified" : "unminified"} file written`);
  } catch (e) {
    return status.fail(`file writing failed, cannot proceed | ${e.message}`);
  }

  if (config.both) {
    try {
      status.start("writing your minified css to disk");
      await fs.outputFile(`${config.output.slice(0, -3)}min.css`, currentMinified);
      //Inform path!!
      status.succeed("minified file written");
    } catch (e) {
      return status.fail(`file writing failed, cannot proceed | ${e.message}`);
    }
  }
}

module.exports = powertools;