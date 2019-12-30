const mongoose = require('mongoose');
require('../db/mongoose');
const Cr_State = require('../models/cr_state');

const stateModel = require('../db/cr_state');

const collections = Object.keys(stateModel);

collections.forEach(col => {
	console.log(col);
	let states = stateModel[col];
	states.forEach(async (val) => {
		val.collection_name = col;
		let state = new Cr_State(val);
		console.log(state);
		try {
			await state.save();
			console.log(state);
		} catch (e) {
			console.log('Error - ' + e);
		}
	})
})
setTimeout(() => {
	mongoose.connection.close();
}, 10000);
