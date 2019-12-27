const mongoose = require('mongoose');

const Story = mongoose.model('Story', {
	title: {
		type: 'string',
		required: true,
		trim: true
	},
	description: {
		type: 'string',
		required: true,
		trim: true
	},
	priority: {
		type: 'number',
		default: 3,
		validate(value) {
			if (value < 1 || value > 5) {
				throw new Error('Priority must be a whole number between 1 and 5');
			}
		}
	}
});

module.exports = Story;