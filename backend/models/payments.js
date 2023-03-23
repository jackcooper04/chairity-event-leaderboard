const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    studentID:{type:Number,required:true},
    type:{type:String,required:true},
    amount:{type:String,required:true}
});

module.exports = mongoose.model('payments', paymentSchema);