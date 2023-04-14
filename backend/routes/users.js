const express = require("express");
const dotenv = require("dotenv");
const user = require('../models/user');
const checkAuth = require("../middleware/check-auth");
dotenv.config();

const router = express.Router();

router.get("/",checkAuth,(req,res,next) => {
  user.find({})
  .then((result) => {
    res.json({users:result})
  })
})
module.exports = router;
