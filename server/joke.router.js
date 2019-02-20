const express = require('express');
const router = express.Router();
const Joke = require('./joke.model');
const getLookupTable = require('./markov')

// joke POST route
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

// joke GET route
router.get('/', (req, res) => {
	// console.log(`in get router`);
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