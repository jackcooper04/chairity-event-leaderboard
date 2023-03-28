const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    lapTimes:{type:Array,required:true},
    fastestTime:{type:String,required:true},
    totalTime:{type:String,required:true},
    marker:{type:Boolean,required:true}
});

module.exports = mongoose.model('sessions', sessionSchema);