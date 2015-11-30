// Import mongoose
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our business contact Schema
var BusinessContactSchema = new Schema({
	contactName: String,
	phone: String,
	email: String,
	provider: String,
	providerId: String,
	providerData: {}
}, {
	collection: 'businessContact'
});

module.exports = mongoose.model('Businesscontact', BusinessContactSchema);