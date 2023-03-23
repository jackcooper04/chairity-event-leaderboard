const mongoose = require('mongoose');
const authSchema = mongoose.Schema({
    name:{type:String,required:true},
    id:{type:String,required:false},
    email:{type:String,required:false}
});


module.exports =  mongoose.model('user',authSchema);
