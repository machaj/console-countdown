#!/usr/bin/env node
import ConsoleCountdown from './ConsoleCountdown';
import commander from 'commander';
import fs from 'fs';
import stringify from 'csv-stringify';


commander
	.version(process.env.npm_package_version)
	.option('-c, --cycle-count <n>', 'number of countdown intervals (default 25)', parseInt)
	.option('-d, --digits <n>', 'number of places for digits (default 4)', parseInt)
	.option('-e, --hide-end-text', 'disable timeout text when time expires')
	.option('-i, --interval <n>', 'set a length of time interval in millis (default 60 sec)', parseInt) // eslint-disable-line
	.option('-o, --output-file [name]', 'file to append output')
	.option('-s, --start-time', 'shows timer start time')
	.parse(process.argv);

const consoleConfig = {};
if (commander.cycleCount) consoleConfig.timer = commander.cycleCount;
if (commander.digits) consoleConfig.minDigits = commander.digits;
if (commander.hideEndText) consoleConfig.displayTimeoutText = false;
if (commander.interval) consoleConfig.interval = commander.interval;
if (commander.startTime) consoleConfig.showStartTime = true;

const consoleCountdown = new ConsoleCountdown(consoleConfig).run(commander.args[0]);

if (commander.outputFile) {
	consoleCountdown.promise.then(
		(result) => {
			stringify([result], { delimiter: ';' }, (err, output) => {
				const fileName = commander.outputFile;
				fs.appendFile(`${fileName}`, output, () => {});
			});
		}
	);
}

process.on('SIGINT', () => {
	consoleCountdown.killSwitch();
});

