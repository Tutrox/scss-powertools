const chalk = require("chalk");
const successMsg = chalk.green;
const errorMsg = chalk.red;
const importantMsg = chalk.white.inverse;
const boldMsg = chalk.bold;

let config;

/**
 * Gets a specified field from config
 * @param {string} data Config field to get
 * @private
 */
function getConfig (data) {
  return config[data];
}

/**
 * Set the entire config
 * @param {object} data Object that will overwrite config
 * @private
 */
function setConfig (data) {
  config = data;
}

/* eslint-disable no-console */

/**
 * Logs a message without any status
 * @param {string} msg The message to output
 */
function log (msg) {
  console.log(msg);
}

/**
 * Logs a success message
 * @param {(string|object)} msg The message to output
 * @param {string} service The service
 */
function success (msg, service) {
  console.log(`${successMsg("Success in step:")} ${importantMsg(service)}`);
  console.log(msg);
}

/**
 * Logs an error message
 * @param {(string|object)} msg The message to output
 * @param {string} service The service, might change the formatting
 */
function error (msg, service) {
  console.error(`${errorMsg("Error in step:")} ${importantMsg(service)}`);
  if (service == "lint") {
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
  getConfig,
  setConfig,
  log,
  success,
  error
};
