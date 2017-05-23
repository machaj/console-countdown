import expect from 'expect';

import simpleFont from 'ascii-numbers/fonts/simple';
import Countdown from '../src/Countdown';

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

describe('Default Countdown', () => {
	describe('Basic run for 2.5 seconds', () => {
		it('should return run object', function (done) { // eslint-disable-line func-names
			this.timeout(3000);
			const countdown = new Countdown({
				interval: 500,
				timer: 5
			});

			countdown.run('Test task').promise.then(
				(result) => {
					expect(result.task).toBe('Test task');
					expect(result.status).toBe('ok');
					done();
				}
			);
		});
	});

	describe('Check if is possible run two countdowns from same instance', () => {
		it('should return false and print error', () => {
			const stdout = new TestStdout();
			const countdown = new Countdown({ stdout, interval: 500, timer: 5 });
			countdown.run('Test 1');

			expect(countdown.run('Test 2')).toBe(false);
			const output = stdout.getOutput();
			expect(output[output.length - 1]).toBe('Countdown is already running!');
		});
	});

	describe('Disable timeout message', () => {
		it('should print 0 instead of timeout', function (done) { // eslint-disable-line
			const stdout = new TestStdout();
			const countdown = new Countdown(
				{
					stdout,
					interval: 100,
					timer: 5,
					displayTimeoutText: false,
					font: simpleFont
				}
			);
			countdown.run('Countdown without timeout message').promise.then(
				() => {
					const output = stdout.getOutput();
					expect(output[3]).toBe('   5');
					expect(output[7]).toBe('   4');
					expect(output[11]).toBe('   3');
					expect(output[15]).toBe('   2');
					expect(output[19]).toBe('   1');
					expect(output[23]).toBe('   0');
					done();
				}
			);
		});
	});

	describe('Stopping countdown by killswitch', () => {
		it('should change result status', function (done) { // eslint-disable-line
			const stdout = new TestStdout();
			const countdown = new Countdown(
				{
					stdout,
					interval: 100,
					timer: 5
				}
			);
			const runningClock = countdown.run('Countdown without timeout message');
			runningClock.promise.then(
				() => {
					// This should not happen
					expect(true).toBe(false);
				}
			);
			const result = runningClock.killSwitch();
			setTimeout(() => {
				expect(result.status).toBe('void');
				done();
			}, 250);
		});
	});
});

