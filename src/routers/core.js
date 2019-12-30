const express = require('express');

const Cr_State = require('../models/cr_state');

const router = new express.Router();



//Create state values
router.post('/core/cr_state', async (req, res) => {
	const state = new Cr_State(req.body);
	try {
		await state.save();
		res.status(201).send(state);
	} catch (e) {
		res.status(400).send(e);
	}
});


//Delete state values
router.delete('/core/cr_state', async (req, res) => {
	try {
		const states = await Cr_State.deleteMany({});
		res.status(40).send(states);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;