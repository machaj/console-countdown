#!/usr/bin/env node
var consoleCountdown = require('./lib/ConsoleCountdown.js'); // eslint-disable-line no-var

consoleCountdown.default.run(process.argv[2]);
