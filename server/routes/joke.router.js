const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
		const headers = {
			'Accept': 'application/json',
			'User-Agent': 'markHAov',
		};
		const params = {
			page: 1,
			limit: 30
		};
    const config = {
			method: 'GET',
			url: 'https://icanhazdadjoke.com/search',
			headers,
			params
		};
		axios.request(config, (req, res) => {
			console.log(res);
		})
		.then(data => data.json())
		.then(jokeJson => console.log(JSON.stringify(jokeJson)))
		.catch(e => console.log(e))
});

module.exports = router;