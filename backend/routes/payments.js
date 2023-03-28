const express = require("express");
const dotenv = require("dotenv");
const payment = require('../models/payments');
const checkAuth = require("../middleware/check-auth");
dotenv.config();

const router = express.Router();

router.post("/",checkAuth,(req,res,next) => {
  const newPay = new payment({
    amount:req.body.amount
  })
  newPay.save();
  res.sendStatus(200);
})
router.get("/",checkAuth,(req,res,next) => {
  payment.find()
  .then((result) => {
    var final = 0;
    for (idx in result){
      final = final + result[idx].amount;
    }
    res.json({amount:final})
  })
})
module.exports = router;
