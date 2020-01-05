const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stateValidator = require('../utils/stateValidator');

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
		default: 10,
		validate: {
			validator: function(value) {
				return stateValidator('story', value);
			},
			message: 'Provided state is not defined - please select a value from the State collection'
		}
	},
	release: {
		type: Schema.Types.ObjectId,
		ref: 'Release'
	},
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project'
	},
	theme: {
		type: 'string',
		trim: true
	},
	est_effort: {
		type: 'number',
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Estimated effort cannot be less than 0');
			}
		}
	},
	actual_effort: {
		type: 'number',
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Actual effort cannot be less than 0');
			}
		}
	}
});

module.exports = Story;