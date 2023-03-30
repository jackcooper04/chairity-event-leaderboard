const express = require("express");
const dotenv = require("dotenv");
const user = require('../models/user');
const checkAuth = require("../middleware/check-auth");
dotenv.config();

const router = express.Router();

router.post("/",checkAuth,(req,res,next) => {
    const newUser = new user({
        name:req.body.name,
        id:req.body.id,
        email:req.body.email
    });
    newUser.save().then((result)=>{
        res.json({user:result})
    }).catch((err)=>{
        console.log(err);
    })
    // user.findOne({id:req.body.id})
    // .then((result) => {
    //     console.log(result)
    //     
    // })

})

module.exports = router;
