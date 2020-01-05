const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stateValidator = require('../utils/stateValidator');

const Release = mongoose.model('Release', {
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
		required: true
	},
	version_no: {
		type: 'string',
		required: true,
		trim: true
	},
	state: {
		type: 'number',
		required: true,
		default: 10,
		validate: {
			validator: function(value) {
				return stateValidator('release', value);
			},
			message: 'Provided state is not defined - please select a value from the State collection'
		}
	},
	description: {
		type: 'string',
		trim: true
	}
});

module.exports = Release;