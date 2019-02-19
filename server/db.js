require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Joke = require('./joke.model');

// If a mongoDB is specified in env config, use it.
// Otherwise, use local mongodb.
let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dadjokes';

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
	console.log(`Connected to database ${mongoURI}.`)
	getData();
})
// .then(() => getStringData())
.catch(e => console.log(`Error with mongoose connection.`, e))


mongoose.connection.on('error', (err) => {
	console.log(`Mongo connection error.`, err)
})

const getData = (page = 1, jokeData = []) => {
	// console.log(page);
	const config = {
		headers: {
			'Accept': 'application/json',
			'User-Agent': 'https://github.com/KarlaJeanNelson'
		},
		params: {
			page,
			limit: 30
		}
	}
	axios.get('https://icanhazdadjoke.com/search', config)
	.then(({data}) => {
		const retrievedJokes = jokeData.concat(data.results)
		if (data.current_page === data.total_pages) {
			const errors = [];
			const updates = [];
			retrievedJokes.forEach(item => {
				const { joke } = item;
				// console.log(joke);
				Joke.findOneAndUpdate({ id: item.id }, { joke }, { upsert: true }, (err, doc) => (
					err ? errors.push(err) : updates.push(doc)
				))
			})
			// console.log(`${updates.length} updates, ${errors.length} errors.`);
		} else {
			page++;
			getData(page, retrievedJokes);
		}
	})
	.catch(e => console.log(`getData error page ${page}`, e))
}