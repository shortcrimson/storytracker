const express = require('express');

const Cr_State = require('../../models/core/cr_state');

const router = new express.Router();

//Create
router.post('/core/cr_state', async (req, res) => {
	const state = new Cr_State(req.body);
	try {
		await state.save();
		res.status(201).send(state);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Read
router.get('/core/cr_state', async (req, res) => {
	try {
		const states = await Cr_State.find(req.body);
		res.send(states);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/core/cr_state/:id', async (req, res) => {
	try {
		const state = await Cr_State.findById(req.params.id);
		if (!state) {
			return res.status(404).send();
		}
		res.send(state);
	} catch (e) {
		res.status(500).send(e);
	}
});

//Update
router.patch('/core/cr_state/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'value'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}
	try {
		const state = await Cr_State.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!state) {
			return res.status(404).send();
		}
		res.send(state);
	} catch (e) {
		res.status(400).send(e);
	}
});


//Delete
router.delete('/core/cr_state/:id', async (req, res) => {
	try {
		const state = await Cr_State.findByIdAndDelete(req.params.id);
		if (!state) {
			return res.status(404).send();
		}
		res.send(state);
	} catch (e) {
		res.status(500).send(e);
	}
});

//Delete all
router.delete('/core/cr_state', async (req, res) => {
	try {
		const states = await Cr_State.deleteMany({});
		res.status(400).send(states);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;