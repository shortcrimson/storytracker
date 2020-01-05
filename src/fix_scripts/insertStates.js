const mongoose = require('mongoose');
require('../db/mongoose');
const Cr_State = require('../models/core/cr_state');

const stateModel = require('../db/cr_state');

const collections = Object.keys(stateModel);

collections.forEach(col => {
	let states = stateModel[col];
	states.forEach(async (val) => {
		val.collection_name = col;
		let state = new Cr_State(val);
		try {
			await state.save();
		} catch (e) {
			console.log('Error - ' + e);
		}
	});
});
setTimeout(() => {
	mongoose.connection.close();
}, 10000);
