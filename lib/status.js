const realStatus = require("ora")();

class Status {
  constructor(config) {
    this.config = config;
  }

  start(what) {
    !this.config.silent && realStatus.start(what);
    return this;
  }

  info(what) {
    !this.config.silent && realStatus.info(what);
    return this;
  }

  succeed(what) {
    !this.config.silent && realStatus.succeed(what);
    return this;
  }

  warn(what) {
    realStatus.warn(what);
    return this;
  }

  fail(what) {
    realStatus.fail(what);
    return this;
  }
}

module.exports = Status;