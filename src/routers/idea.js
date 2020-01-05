const express = require('express');
const Idea = require('../models/idea');
const router = new express.Router();

//Create
router.post('/ideas', async (req, res) => {
	const idea = new Idea(req.body);
	try {
		await idea.save();
		res.status(201).send(idea);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Read
router.get('/ideas', async (req, res) => {
	try {
		const stories = await Idea.find(req.body);
		res.send(stories);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/ideas/:id', async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);
		if (!idea) {
			return res.status(404).send();
		}
		res.send(idea);
	} catch (e) {
		res.status(500).send(e);
	}
});

//Update
router.patch('/ideas/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['title', 'description', 'project', 'state'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}
	try {
		const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!idea) {
			return res.status(404).send();
		}
		res.send(idea);
	} catch (e) {
		res.status(400).send(e);
	}
});


//Delete
router.delete('/ideas/:id', async (req, res) => {
	try {
		const idea = await Idea.findByIdAndDelete(req.params.id);
		if (!idea) {
			return res.status(404).send();
		}
		res.send(idea);
	} catch (e) {
		res.status(500).send(e);
	}
});


module.exports = router;