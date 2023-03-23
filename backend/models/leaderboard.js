const mongoose = require('mongoose');

const leaderSchema = mongoose.Schema({
    track_id:{type:String,required:true},
    sessionID:{type:String,required:true},
    user:{type:String,required:true}


});

module.exports = mongoose.model('leaderboard' , leaderSchema);