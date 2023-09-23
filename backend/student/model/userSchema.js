const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    date:String,
    class:String,
    sub:String,
})

const User = mongoose.model('studentData',userSchema);

module.exports = User;