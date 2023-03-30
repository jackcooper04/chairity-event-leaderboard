const express = require("express");
const dotenv = require("dotenv");
const leaderboard = require('../models/leaderboard');
const session = require('../models/session');
const tracks = require('../models/tracks');
const user = require('../models/user');
const lap = require('../models/lap');
const checkAuth = require('../middleware/check-auth')
dotenv.config();

const router = express.Router();


router.post("/",checkAuth, (req, res, next) => {

  const newSession = new lap({
    lapTimes: req.body.session.laptimes,
    marker: req.body.session.marker,
    fastestTime: req.body.session.fastest,
    totalTime: req.body.session.total,
    user: req.body.user,
    trackId: req.body.track_id
  });
  newSession.save();
  res.sendStatus(200);



})


router.get("/", checkAuth,(req, res, next) => {

    lap.find()
    .populate('track_id user')
    .then((result)=>{
      var newArray = new Array();
      for (idx in result){
        console.log(result)
        if (result[idx].track_id.track_name == req.query.track){
          newArray.push(result[idx]);
        }
      }
      res.json({sessions:newArray})
    });


})
module.exports = router;
