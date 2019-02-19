// const getStringData = (page = 1, jokeData = []) => {
// 	console.log(page);
// 	const config = {
// 		headers: {
// 			'Accept': 'application/json',
// 			'User-Agent': 'https://github.com/KarlaJeanNelson'
// 		},
// 		params: {
// 			page,
// 			limit: 30
// 		}
// 	}
// 	axios.get('https://icanhazdadjoke.com/search', config)
// 	.then(({data}) => {
// 		const retrievedJokes = jokeData.concat(data.results)
// 		if (data.current_page === data.total_pages) {
// 			let jokeString = ''
// 			retrievedJokes.forEach(item => jokeString += item.joke.toString())
// 			return jokeString;
// 		} else {
// 			page++;
// 			return getStringData(page, retrievedJokes);
// 		}
// 	})
// 	.then(results => console.log(newJoke(results)))
// 	.catch(e => console.log(`getData error page ${page}`, e))
// }

// const newJoke = (source, order = 8) => {
// 	console.log(source, order);
	
// 	let myGenerator = new MarkovChain({source, order})
	
// 	return myGenerator.generate() // Outputs e.g: 'Sed nibh element libero'
// }