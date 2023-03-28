const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    amount:{type:Number,required:true}
});

module.exports = mongoose.model('payments', paymentSchema);
