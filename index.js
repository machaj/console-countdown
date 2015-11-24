var ttys = require('ttys');
var stdout = ttys.stdout;

var emptyLine = '\n\n\n\n\n\n';

var numbers = {
	x: ['         ', '         ', '         ', '         ', '         ', '         '],
	1: ['     ██╗ ', '    ███║ ', '    ╚██║ ', '     ██║ ', '     ██║ ', '     ╚═╝ '],
	2: [' ██████╗ ', ' ╚════██╗', '  █████╔╝', ' ██╔═══╝ ', ' ███████╗', ' ╚══════╝'],
	3: [' ██████╗ ', ' ╚════██╗', '  █████╔╝', '  ╚═══██╗', ' ██████╔╝', ' ╚═════╝ '],
	4: [' ██╗  ██╗', ' ██║  ██║', ' ███████║', ' ╚════██║', '      ██║', '      ╚═╝'],
	5: [' ███████╗', ' ██╔════╝', ' ███████╗', ' ╚════██║', ' ███████║', ' ╚══════╝'],
	6: [' ██████╗ ', '██╔════╝ ', '███████╗ ', '██╔═══██╗', '╚██████╔╝', ' ╚═════╝ '],
	7: [' ███████╗', ' ╚════██║', '     ██╔╝', '    ██╔╝ ', '    ██║  ', '    ╚═╝  '],
	8: ['  █████╗ ', ' ██╔══██╗', ' ╚█████╔╝', ' ██╔══██╗', ' ╚█████╔╝', '  ╚════╝ '],
	9: ['  █████╗ ', ' ██╔══██╗', ' ╚██████║', '  ╚═══██║', '  █████╔╝', '  ╚════╝ '],
	0: [' ██████╗ ', '██╔═████╗', '██║██╔██║', '████╔╝██║', '╚██████╔╝', ' ╚═════╝ ']
};

var timeoutText = [
'████████╗██╗███╗   ███╗███████╗ ██████╗ ██╗   ██╗████████╗',
'╚══██╔══╝██║████╗ ████║██╔════╝██╔═══██╗██║   ██║╚══██╔══╝',
'   ██║   ██║██╔████╔██║█████╗  ██║   ██║██║   ██║   ██║',
'   ██║   ██║██║╚██╔╝██║██╔══╝  ██║   ██║██║   ██║   ██║',
'   ██║   ██║██║ ╚═╝ ██║███████╗╚██████╔╝╚██████╔╝   ██║',
'   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝ ╚═════╝  ╚═════╝    ╚═╝'
];

var timer = 25;
var timeout = 60000;

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
		output.push(_prefix + numbers[firstDigit][i] + ' ' + numbers[secondDigit][i]);
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

function run() {
	cursorUp(7);
	if (timer > 0) {
		stdout.write(printNumber(timer, '        '));
		stdout.write('\n\n');
		timer--;
		setTimeout(function() {
			run();
		}, timeout);
	} else {
		stdout.write(timeoutText.join('\n'));
		stdout.write('\n\n\n');
	}
}

stdout.write(emptyLine);
stdout.write('\n\n');
run();