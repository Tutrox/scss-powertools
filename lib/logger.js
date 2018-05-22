const chalk = require("chalk");
const successMsg = chalk.green;
const errorMsg = chalk.red;
const importantMsg = chalk.white.inverse;
const boldMsg = chalk.bold;

let config = {};

/* eslint-disable no-console */

/**
 * Logs a message without any status
 * @param {string} msg The message to output
 * @private
 */
function log(msg) {
  console.log(msg);
}

/**
 * Logs a success message
 * @param {(string|object)} msg The message to output
 * @param {string} service The service
 * @param {string} path The file path
 * @private
 */
function success(msg, service, path) {
  console.log(`${successMsg("Success in step:")} ${importantMsg(service)} ${path ? `for ${boldMsg(path)}` : ""}`);
  console.log(msg);
}

/**
 * Logs an error message
 * @param {(string|object)} msg The message to output
 * @param {string} service The service
 * @param {string} path The file path
 * @param {boolean} custom Should we use custom formatter
 * @private
 */
function error(msg, service, path, custom) {
  console.error(`${errorMsg("Error in step:")} ${importantMsg(service)} ${path ? `for ${boldMsg(path)}` : ""}`);
  if (custom && service === "lint") {
    console.log(`In file ${boldMsg(config.input)}`);
    JSON.parse(msg)[0].warnings.forEach(value => {
      console.log(`${value.text} on line ${value.line}`);
    });
  } else {
    console.error(msg);
  }
  if (config.production) process.exitCode = 1;
}

module.exports = {
  log,
  success,
  error,
  config
};
