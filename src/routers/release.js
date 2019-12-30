const express = require('express');
const Release = require('../models/release');
const router = express.Router();

//Create
router.post('/releases', async (req, res) => {
	const release = new Release(req.body);
	try {
		await release.save();
		res.status(201).send(release);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Read
router.get('/releases', async (req, res) => {
	try {
		const release = await Release.find(req.body);
		res.send(release);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/releases/:id', async (req, res) => {
	try {
		const release = await Release.findById(req.params.id);
		if (!release) {
			return res.status(404).send();
		}
		res.send(release);
	} catch (e) {
		res.status(500).send(e);
	}
});

//Update
router.patch('/releases/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['state', 'version_no'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}
	try {
		const release = await Release.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
		if (!release) {
			return res.status(400).send();
		}
		res.send(release);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Delete
router.delete('/releases/:id', async (req, res) => {
	try {
		const release = await Release.findByIdAndDelete(req.params.id);
		if (!release) {
			return res.status(404).send();
		}
		res.send(release);
	} catch (e) {
		return res.status(500).send(e);

	}
});

module.exports = router;