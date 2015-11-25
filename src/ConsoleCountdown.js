var ttys = require('ttys');
var stdout = ttys.stdout;

function ConsoleCountdown() {
	var config = {
		timer: 25,
		interval: 60000,
		numbers: null,
		timeoutText: null,
		emptyLine: '\n\n\n\n\n\n'
	};

	function cursorUp (i) {
		var _i = i || 1;

		if (_i > 0) {
			while(_i--) {
				stdout.write('\033[K\033[1A\r');
			}
		}
	}

	function digitsLine(firstDigit, secondDigit, prefix) {
		var _prefix = prefix || '';
		var output = [];
		for (var i = 0; i < 6; i++) {
			output.push(_prefix + config.numbers[firstDigit][i] + ' ' + config.numbers[secondDigit][i]);
		}
		return output.join('\n');
	}

	function printNumber(number, prefix) {
		var _number = typeof number === 'number' ? number.toString() : 'x';
		var firstDigit = 'x';
		var secondDigit = _number[0];

		if (_number.length === 2) {
			firstDigit = _number[0];
			secondDigit = _number[1];
		}
		return digitsLine(firstDigit, secondDigit, prefix);
	}

	function countDown() {
		cursorUp(7);
		if (config.timer > 0) {
			stdout.write(printNumber(config.timer, '        '));
			stdout.write('\n\n');
			config.timer--;
			setTimeout(() => {
				countDown();
			}, config.interval);
		} else {
			stdout.write(config.timeoutText.join('\n'));
			stdout.write('\n\n\n');
		}
	}

	var run = function(numbers, timeoutText) {
		if (numbers && timeoutText) {
			config.numbers = numbers;
			config.timeoutText = timeoutText;
			stdout.write(config.emptyLine);
			stdout.write('\n\n');
			countDown();
		}
	};

	return {
		run: run
	}
}

module.exports = ConsoleCountdown();
