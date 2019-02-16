
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
// app.use('/api/jokes', jokeRouter)

// Serve static files
app.use(express.static('build'));

const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
	console.log(`Application listening on port ${PORT}`);
});