const express = require('express');
const Story = require('../models/story');
const router = new express.Router();

//Create
router.post('/stories', async (req, res) => {
	const story = new Story(req.body);
	try {
		await story.save();
		res.status(201).send(story);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Read
router.get('/stories', async (req, res) => {
	try {
		const stories = await Story.find(req.query);
		res.send(stories);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/stories/:id', async (req, res) => {
	try {
		const story = await Story.findById(req.params.id);
		if (!story) {
			return res.status(404).send();
		}
		res.send(story);
	} catch (e) {
		res.status(500).send(e);
	}
});

//Update
router.patch('/stories/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['title', 'description', 'imp_details', 'priority', 'state'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}
	try {
		const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!story) {
			return res.status(404).send();
		}
		res.send(story);
	} catch (e) {
		res.status(400).send(e);
	}
});


//Delete
router.delete('/stories/:id', async (req, res) => {
	try {
		const story = await Story.findByIdAndDelete(req.params.id);
		if (!story) {
			return res.status(404).send();
		}
		res.send(story);
	} catch (e) {
		res.status(500).send(e);
	}
});


module.exports = router;