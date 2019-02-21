const express = require('express');
const router = express.Router();
const Joke = require('./joke.model');
const getLookupTable = require('./markov')

router.post('/', (req, res) => {
	const { newJoke } = req.body;
	// console.log(`in post route`, newJoke);
	Joke.create({ joke: newJoke }, (err, doc) => {
		err ? res.json({ success: false, error: err }) : res.sendStatus(201)
	})
})

// joke PUT route
router.put('/', (req, res) => {
	const { payload } = req.body;
	const updates = [];
	const errors = [];
	payload.forEach(item => {
		Joke.findOneAndUpdate({ id: item.id }, item, { upsert: true }, (err, doc) => (
			err ? errors.push(item) : updates.push(item)
		))
	})
	res.json({ success: errors.length > 0, message: `${updates.length} updates, ${errors.length} errors` });
})

// joke GET route
router.get('/', (req, res) => {
	Joke.find({}, (err, docs) => {
		console.log(docs);
		return err ? res.json({ success: false, error: err }) : res.send(docs)
	})
});

// tuple GET route
router.get('/tuples/:order', (req, res) => {
	const { order } = req.params;
	// console.log(`tuple get`, order);
	Joke.find({}, (err, docArr) => {
		return err ? ({ success: false, error: err }) : docArr
	})
	.then(results => getLookupTable(results, order))
	.then(results => res.send(results))
	.catch(e => res.json({ success: false, error: e }))
})

module.exports = router;