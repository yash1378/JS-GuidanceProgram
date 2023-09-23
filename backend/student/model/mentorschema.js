const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    number:Number,
    college:String,
    date:String,
    handle:Number,
})

const Mentor = mongoose.model('mentorData',userSchema);

module.exports = Mentor;