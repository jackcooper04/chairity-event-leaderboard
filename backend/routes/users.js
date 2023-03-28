const express = require("express");
const dotenv = require("dotenv");
const user = require('../models/user')
dotenv.config();

const router = express.Router();

router.post("/",(req,res,next) => {
    const newUser = new user({
        name:req.body.name,
        id:req.body.id,
        email:req.body.email
    });
    newUser.save();
    res.sendStatus(200);
})

module.exports = router;