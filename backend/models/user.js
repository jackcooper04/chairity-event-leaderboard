const mongoose = require('mongoose');
const authSchema = mongoose.Schema({
    studentName:{type:String,required:true},
    studentID:{type:Number,required:true}
});


module.exports =  mongoose.model('user',authSchema);
