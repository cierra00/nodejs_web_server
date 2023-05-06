const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
   code: {
    type: String,
    required: true
   },
   funFacts: {
    type: String,
    required: true
   }
});

module.exports = mongoose.model('State', stateSchema);