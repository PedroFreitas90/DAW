var mongoose = require('mongoose')

var laureatesSchema = new mongoose.Schema({
    id : String,
    firstname: String,
    surname : String,
    motivation: String,
    share: String
})

var nobelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    year: String,
    category: String,
    overallMotivation: String,
    laureates: [laureatesSchema] 
});

module.exports = mongoose.model('nobel',nobelSchema)