const express = require("express");
const dotenv = require("dotenv");
const track = require('../models/tracks')
dotenv.config();

const router = express.Router();

// router.post("/", (req,res,next) => {
//     var newTrack = new  track ({
//         track_name:req.body.name,
//         base_times:req.body.times,
//         cup_name:req.body.cup
//     });
//     newTrack.save();
//     res.send('OK')
// });

router.get('/',(req,res,next) => {
    track.find({})
    .then((result) => {
        res.json({tracks:result})
    })
})

module.exports = router;