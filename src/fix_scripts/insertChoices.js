const mongoose = require('mongoose');
require('../db/mongoose');
const Cr_Choice = require('../models/core/cr_choice');

const choiceModel = require('../db/cr_choice');

const collections = Object.keys(choiceModel);

collections.forEach(col => {
	let fields = Object.keys(choiceModel[col]);
	fields.forEach(field => {
		let choices = choiceModel[col][field];
		choices.forEach(async (val) => {
			val.collection_name = col;
			val.field_name = field;
			let choice = new Cr_Choice(val);
			try {
				await choice.save();
			} catch (e) {
				console.log('Error - ' + e);
			}
		});
	});
});
setTimeout(() => {
	mongoose.connection.close();
}, 10000);