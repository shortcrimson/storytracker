const Cr_State = require('../models/core/cr_state');
const Cr_Choice = require('../models/core/cr_choice');

/**
 * Validator function to check that there is a valid entry for a given state and collection in the cr_state table
 * @param {string} collectionName 
 * @param {number} value 
 */
const stateValidator = async (collectionName, value) => {
	const qry = {
		'collection_name': collectionName,
		'value': value
	};
	try {
		const states = await Cr_State.find(qry);
		if (states.length > 0) {
			return true;
		}
		return false;
	} catch (e) {
		console.log('Error in stateValidator: ' + e);
		return false;
	}
}

const choiceValidator = async (collectionName, fieldName, value) => {
	const qry = {
		'collection_name': collectionName,
		'field_name': fieldName,
		'value': value
	};
	try {
		const choices = await Cr_Choice.find(qry);
		if (choices.length > 0) {
			return true;
		}
		return false;
	} catch (e) {
		console.log('Error in choiceValidator: ' + e);
		return false;
	}
}

module.exports = { stateValidator, choiceValidator };