#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const match = require("./helpers/arraymatch");
const powerTools = require("./powertools");
const logger = require("./logger");

require("pkginfo")(module, "version");

program
  .usage("<source SCSS> <output CSS> [options]")
  .version(module.exports.version)
  .option("-p, --production", "Run in production, any error (such as lint) will fail the build. Also enables minify.")
  .option("-s, --separate", "Will create both an unminified and a minified file.")
  .option("-m, --minify", "Minify the file, even if not in production.")
  .option("-d --directory <outputDir>", "Set the output directory. Use when you process multiple files at once. File names will be generated automatically.")
  .parse(process.argv);

if (program.production) logger.config.production = true;
if (program.separate) logger.config.separate = true;
if (program.minify) logger.config.minify = true;
if (program.directory) logger.config.directory = program.directory;

let inputFiles = program.args[0].split(",");

if (program.args.length === 0) {
  /* eslint-disable no-console */
  console.log(chalk.bold.yellow("scss-powertools!"));
  console.log(chalk.cyan("Usage:") + " scss-powertools --help");
  /* eslint-enable no-console */
} else if (!program.directory && program.args.length !== 2) {
  logger.error("You have to give two arguments: <source> <output>", "initialize");
} else if (program.directory && program.args.length !== 1) {
  logger.error("You have to give only one argument with the --directory option: <source>", "initialize");
} else if (!match(inputFiles, ".scss") || !program.directory && !program.args[1].endsWith(".css")) {
  logger.error("Some of your files do not have the right extension. Input should be .scss and output should be .css", "initialize");
} else {
  powerTools(inputFiles, program.args[1]);
}
