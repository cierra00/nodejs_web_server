const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
   code: {
    type: String,
    required: true
   },
   funfact: {
    type: Array,
    required: true
   }
});

module.exports = mongoose.model('State', stateSchema);