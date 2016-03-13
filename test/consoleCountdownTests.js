import expect from 'expect';

import consoleCountdown from '../src/ConsoleCountdown';

describe('Default ConsoleCountdown', () => {
	describe('Basic run for 2.5 seconds', () => {
		it('should return run object', function (done) { // eslint-disable-line func-names
			this.timeout(3000);
			consoleCountdown.run('Test task', {
				interval: 500,
				timer: 5
			}).then(
				(result) => {
					expect(result.task).toBe('Test task');
					done();
				}
			);
		});
	});
});

