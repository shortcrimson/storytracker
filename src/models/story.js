const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stValidationUtils = require('../utils/stValidationUtils');

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
		validate: {
			validator: function(value) {
				return stValidationUtils.choiceValidator('story', 'priority', value);
			},
			message: 'Provided priority value is not a valid choice'
		}
	},
	state: {
		type: 'number',
		required: true,
		default: 10,
		validate: {
			validator: function(value) {
				return stValidationUtils.stateValidator('story', value);
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
		trim: true,
		validate: {
			validator: function(value) {
				return stValidationUtils.choiceValidator('story', 'theme', value);
			},
			message: 'Provided theme is not a valid choice'
		}
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