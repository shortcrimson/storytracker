const mongoose = require('mongoose');
const stValidationUtils = require('../utils/stValidationUtils');

const Project = mongoose.model('Project', {
	name: {
		type: 'string',
		required: true,
		trim: true,
		unique: true
	},
	description: {
		type: 'string',
		trim: true
	},
	state: {
		type: 'number',
		required: true,
		default: 10,
		validate: {
			validator: function(value) {
				return stValidationUtils.stateValidator('project', value);
			},
			message: 'Provided state is not defined - please select a value from the State collection'
		}
	}
});

module.exports = Project;