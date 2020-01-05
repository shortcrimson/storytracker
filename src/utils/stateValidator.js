const Cr_State = require('../models/cr_state');

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

module.exports = stateValidator;