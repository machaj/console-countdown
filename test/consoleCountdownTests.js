import expect from 'expect';

import ConsoleCountdown from '../src/ConsoleCountdown';

class TestStdout {
	constructor() {
		this.output = [];
	}

	write(text) {
		this.output.push(text);
	}

	getOutput() {
		return this.output;
	}
}

describe('Default ConsoleCountdown', () => {
	describe('Basic run for 2.5 seconds', () => {
		it('should return run object', function (done) { // eslint-disable-line func-names
			this.timeout(3000);
			const countdown = new ConsoleCountdown({
				interval: 500,
				timer: 5
			});

			countdown.run('Test task').promise.then(
				(result) => {
					expect(result.task).toBe('Test task');
					done();
				}
			);
		});
	});

	describe('Check if is possible run two countdowns from same instance', () => {
		it('should return false and print error', () => {
			const stdout = new TestStdout();
			const countdown = new ConsoleCountdown({ stdout, interval: 500, timer: 5 });
			countdown.run('Test 1');

			expect(countdown.run('Test 2')).toBe(false);
			const output = stdout.getOutput();
			expect(output[output.length - 1]).toBe('ConsoleCountdown is already running!');
		});
	});
});

