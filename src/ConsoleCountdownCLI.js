#!/usr/bin/env node
import ConsoleCountdown from './ConsoleCountdown';
const consoleCountdown = new ConsoleCountdown().run(process.argv[2]);

process.on('SIGINT', () => {
	consoleCountdown.killSwitch();
});

