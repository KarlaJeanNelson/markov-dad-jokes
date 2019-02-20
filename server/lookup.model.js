const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lookupSchema = new Schema({
	id: String,
	joke: String,
	},
	{ timestamps: true, strict: false }
);

module.exports = mongoose.model('Lookup', lookupSchema);