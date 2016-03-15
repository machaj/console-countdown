import AsciiNumbers from 'ascii-numbers';
import defaultFont from 'ascii-numbers/fonts/ANSI_Shadow';
import moment from 'moment';
import ttys from 'ttys';

const defaultConfig = {
	font: defaultFont,
	interval: 60000,
	minDigits: 4,
	showStartTime: false,
	stdout: ttys.stdout,
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

class ConsoleCountdown {
	constructor(userConfig = {}) {
		this.config = Object.assign({}, defaultConfig, userConfig);
		this.startTime = moment();
		this.asciiNumbers = new AsciiNumbers(this.config.font, {
			minDigits: this.config.minDigits || this.config.timer.toString().length
		});
	}

	_countDown(digit, delay, callback) {
		this._cursorUp(7);
		if (digit > 0) {
			this.config.stdout.write(this.asciiNumbers.getNumber(digit));
			this.config.stdout.write('\n\n');
			this.timeoutId = setTimeout(() => {
				this._countDown(digit - 1, delay, callback);
			}, delay);
		} else {
			callback();
		}
	}

	_cursorUp(i) {
		let _i = i || 1;

		if (_i > 0) {
			while (_i--) {
				this.config.stdout.write('\x1B[K\x1B[1A\r');
			}
		}
	}

	_getResult() {
		return {
			task: this.task,
			startTime: this.startTime.toDate(),
			endTime: moment().toDate()
		};
	}

	run(task = null) {
		if (this.running) {
			this.config.stdout.write('ConsoleCountdown is already running!');
			return false;
		}

		this.running = true;
		this.task = task;

		if (this.config.showStartTime) {
			this.config.stdout.write(`Started at ${this.startTime.format(this.config.timeFormat)}\n`);
		}
		this.config.stdout.write('\n'.repeat(this.asciiNumbers.getFontStatistic().height + 2));

		return {
			promise: new Promise((resolve) => {
				this._countDown(this.config.timer, this.config.interval, () => {
					this.config.stdout.write(this.config.timeoutText.join('\n'));
					this.config.stdout.write('\n\n\n');
					this.running = false;
					resolve(this._getResult());
				});
			}),
			killSwitch: () => {
				this.running = true;
				clearTimeout(this.timeoutId);
				return this._getResult();
			}
		};
	}
}

export default ConsoleCountdown;
