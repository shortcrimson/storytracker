const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stateValidator = require('../utils/stateValidator');

const Idea = mongoose.model('Idea', {
	title: {
		type: 'string',
		required: true,
		trim: true
	},
	description: {
		type: 'string',
		trim: true
	},
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project'
	},
	state: {
		type: 'string',
		required: true,
		default: 10,
		validate: {
			validator: function(value) {
				return stateValidator('idea', value);
			},
			message: 'Provided state is not defined - please select a value from the State collection'
		}
	}
});

module.exports = Idea;