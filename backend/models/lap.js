const mongoose = require('mongoose');
const tracks = require('./tracks');
const user = require('./user');

const leaderSchema = mongoose.Schema({
    track_id:{type:mongoose.Schema.Types.ObjectId,ref:tracks},
    user:{type:mongoose.Schema.Types.ObjectId,ref:user},
    lapTimes:{type:Array,required:true},
    fastestTime:{type:Number,required:true},
    totalTime:{type:Number,required:true},
    marker:{type:Boolean,required:true}

});

module.exports = mongoose.model('lap' , leaderSchema);
