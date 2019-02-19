const express = require('express');
const router = express.Router();
const Joke = require('./joke.model');

// POST route
router.put('/', (req, res) => {
	const { payload } = req.body;
	const updates = [];
	const errors = [];
	// console.log(`in post router`, payload);
	payload.forEach(item => {
		Joke.findOneAndUpdate({ id: item.id }, item, { upsert: true }, (err, doc) => (
			err ? errors.push(item) : updates.push(item)
		))
	})
	res.json({ success: errors.length > 0, message: `${updates.length} updates, ${errors.length} errors` });
})

// GET route
router.get('/', (req, res) => {
	// console.log(`in get router`);
	Joke.find({}, (err, docs) => {
		console.log(docs);
		return err ? res.json({ success: false, error: err }) : res.send(docs)
	})
});

module.exports = router;