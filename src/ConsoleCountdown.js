import AsciiNumbers from 'ascii-numbers';
import defaultFont from 'ascii-numbers/fonts/ANSI_Shadow';
import moment from 'moment';
import ttys from 'ttys';

const stdout = ttys.stdout;
const defaultConfig = {
	font: defaultFont,
	interval: 60000,
	minDigits: null,
	showStartTime: false,
	timeFormat: 'HH:mm:ss',
	timer: 25,
	timeoutText: [
		'████████╗██╗███╗   ███╗███████╗ ██████╗ ██╗   ██╗████████╗',
		'╚══██╔══╝██║████╗ ████║██╔════╝██╔═══██╗██║   ██║╚══██╔══╝',
		'   ██║   ██║██╔████╔██║█████╗  ██║   ██║██║   ██║   ██║',
		'   ██║   ██║██║╚██╔╝██║██╔══╝  ██║   ██║██║   ██║   ██║',
		'   ██║   ██║██║ ╚═╝ ██║███████╗╚██████╔╝╚██████╔╝   ██║',
		'   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝ ╚═════╝  ╚═════╝    ╚═╝'
	]
};
let asciiNumbers;

function cursorUp(i) {
	let _i = i || 1;

	if (_i > 0) {
		while (_i--) {
			stdout.write('\x1B[K\x1B[1A\r');
		}
	}
}

function countDown(digit, interval, callback) {
	cursorUp(7);
	if (digit > 0) {
		stdout.write(asciiNumbers.getNumber(digit));
		stdout.write('\n\n');
		setTimeout(() => {
			countDown(digit - 1, interval, callback);
		}, interval);
	} else {
		callback();
	}
}

function run(task, userConfig = {}) {
	const config = Object.assign({}, defaultConfig, userConfig);
	const startTime = moment();
	asciiNumbers = new AsciiNumbers(config.font, {
		minDigits: config.minDigits || config.timer.toString().length
	});

	if (config.showStartTime) {
		stdout.write(`Started at ${startTime.format(config.timeFormat)}\n`);
	}
	if (task) {
		stdout.write(`Task ${task}\n\n`);
	}

	stdout.write('\n'.repeat(asciiNumbers.getFontStatistic().height + 2));

	return new Promise((resolve) => {
		countDown(config.timer, config.interval, () => {
			stdout.write(config.timeoutText.join('\n'));
			stdout.write('\n\n\n');

			resolve({
				task,
				startTime: startTime.toDate(),
				endTime: moment().toDate()
			});
		});
	});
}

export default {
	run
};
