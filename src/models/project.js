const mongoose = require('mongoose');

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
		default: 10
	}
});

module.exports = Project;