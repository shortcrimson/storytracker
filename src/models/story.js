const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	imp_details: {
		type: 'string',
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
	},
	state: {
		type: 'number',
		required: true,
		default: 10
	},
	release: {
		type: Schema.Types.ObjectId,
		ref: 'Release'
	}
});

module.exports = Story;