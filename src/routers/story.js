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

//Get
router.get('/stories', async (req, res) => {
	try {
		const stories = await Story.find(req.query);
		res.send(stories);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;