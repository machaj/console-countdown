import expect from 'expect';

import ConsoleCountdown from '../src/ConsoleCountdown';

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
});

