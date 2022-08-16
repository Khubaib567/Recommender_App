const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
   score : {
        type:Number,
        required: true
    } 
})

module.exports = new mongoose.model('Setscore', scoreSchema)