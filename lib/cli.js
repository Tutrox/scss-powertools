#!/usr/bin/env node

//Remove!!
//require("pkginfo")(module, "version");

const minimist = require("minimist");
//const ora = require("ora");
//
//const status = ora("scss-powertools is initializing").start();
const args = minimist(process.argv.slice(2));

const Status = require("./status");
const powertools = require("./powertools");

//Both!!
//Version info!!
if (args.c) {
  //status.info("reading from config, cli arguments ignored");
} else if (args.i && args.i !== true && args.i.endsWith(".scss")) {
  const config = {
    input: args.i,
    output: args.o || `${args.i.slice(0, -4)}css`,

    production: args.p ? true : false,
    both: args.b ? true : false,
    silent: args.s ? true : false
  };

  const initializedStatus = new Status(config);
  initializedStatus.info("using cli config").start("compiling scss");

  powertools(config, initializedStatus);
} else if (args.h) {
  new Status().info("docs @ https://git.io/Jvpg4");
} else {
  new Status().fail("I haven't received anything valid to process: run scss-powertools -h");
}