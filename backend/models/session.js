const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    track:{type:String,required:true},
    lapTimes:{type:Array,required:true},
    fastestTime:{type:String,required:true}
});

module.exports = mongoose.model('sessions', sessionSchema);