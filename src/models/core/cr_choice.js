const mongoose = require('mongoose');

const Cr_Choice = mongoose.model('Cr_Choice', {
	name: {
		type: 'string',
		required: true,
		trim: true
	},
	value: {
		type: 'string',
		required: true
	},
	collection_name: {
		type: 'string',
		required: true
	},
	field_name: {
		type: 'string',
		required: true
	}
});

module.exports = Cr_Choice;