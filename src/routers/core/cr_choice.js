const express = require('express');
const Cr_Choice = require('../../models/core/cr_choice');
const router = new express.Router();

//Create
router.post('/core/cr_choice', async (req, res) => {
	const choice = new Cr_Choice(req.body);
	try {
		await choice.save();
		res.status(201).send(choice);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Read
router.get('/core/cr_choice', async (req, res) => {
	try {
		const choices = await Cr_Choice.find(req.body);
		res.send(choices);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/core/cr_choice/:id', async (req, res) => {
	try {
		const choice = await Cr_Choice.findById(req.params.id);
		if (!choice) {
			return res.status(404).send();
		}
		res.send(choice);
	} catch (e) {
		res.status(500).send(e);
	}
});

//Update
router.patch('/core/cr_choice/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'value'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}
	try {
		const choice = await Cr_Choice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!choice) {
			return res.status(404).send();
		}
		res.send(choice);
	} catch (e) {
		res.status(400).send(e);
	}
});


//Delete
router.delete('/core/cr_choice/:id', async (req, res) => {
	try {
		const choice = await Cr_Choice.findByIdAndDelete(req.params.id);
		if (!choice) {
			return res.status(404).send();
		}
		res.send(choice);
	} catch (e) {
		res.status(500).send(e);
	}
});

//Delete all
router.delete('/core/cr_choice', async (req, res) => {
	try {
		const choices = await Cr_Choice.deleteMany({});
		res.status(400).send(choices);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;