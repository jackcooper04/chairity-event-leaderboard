const express = require("express");
const dotenv = require("dotenv");
const track = require('../models/tracks');
const checkAuth = require("../middleware/check-auth");
dotenv.config();

const router = express.Router();

router.post("/",checkAuth, (req,res,next) => {
    var newTrack = new  track ({
        track_name:req.body.name,
        base_times:req.body.times,
        cup_name:req.body.cup
    });
    newTrack.save();
    res.send('OK')
});

router.get('/',checkAuth,(req,res,next) => {
    track.find({})
    .then((result) => {
        res.json({tracks:result})
    })
})

module.exports = router;
