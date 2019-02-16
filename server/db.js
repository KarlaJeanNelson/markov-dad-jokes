require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');

// If a mongoDB is specified in env config, use it.
// Otherwise, use local mongodb.
let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/markhaov';

mongoose.connect(mongoURI, { useNewUrlParser: true })

mongoose.connection.once('open', () => {
	console.log(`Connected to database ${mongoURI}.`)
	getData();
});

mongoose.connection.on('error', (err) => {
	console.log(`Mongo connection error.`, err);
});

const getData = () => {
	// console.log(`in getData`);
	const config = {
		headers: {
			'Accept': 'application/json',
			'User-Agent': 'markHAov',
		},
		params: {
			page: 1,
			limit: 30
		}
	};
	axios.get('https://icanhazdadjoke.com/search', config)
	.then(({data}) => data.results.map(joke => joke.joke))
	.then((jokes) => console.log(JSON.stringify(jokes)))
	.catch(e => console.log(e))
}