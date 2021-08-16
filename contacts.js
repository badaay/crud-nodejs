var mongoose = require('mongodb');

// Setup schema
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}

// const { MongoClient } = require("mongodb");
// // Replace the following with your MongoDB deployment's connection string.
// const uri =
//     `mongodb://localhost:27017/`;
// // Create a new MongoClient
// const client = new MongoClient(uri);