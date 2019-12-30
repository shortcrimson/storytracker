const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
		default: 10
	}
});

module.exports = Release;