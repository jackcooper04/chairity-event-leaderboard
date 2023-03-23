const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
    track_name:{type:String,required:true},
    base_time:{type:String,required:true}


});

module.exports = mongoose.model('tracks' , trackSchema);