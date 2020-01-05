const mongoose = require ('mongoose');

const Cr_State = mongoose.model('Cr_State', {
	name: {
		type: 'string',
		required: true,
		trim: true
	},
	value: {
		type: 'number',
		required: true
	},
	collection_name: {
		type: 'string',
		required: true,
	}
});

module.exports = Cr_State;