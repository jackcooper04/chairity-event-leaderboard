const express = require("express");
const dotenv = require("dotenv");
const leaderboard = require('../models/leaderboard');
const session = require('../models/session');
const tracks = require('../models/tracks');
const user = require('../models/user');
const lap = require('../models/lap');
const checkAuth = require('../middleware/check-auth');

dotenv.config();

const router = express.Router();



router.post("/",checkAuth, (req,res,next) => {
  console.log(req.body.user.id)

  user.find({_id:req.body.user.id})
  .then((result) => {

    newUser = result;

    var newSession = new lap({
      user:newUser._id,
      track_id:req.body.trackID,
      lapTimes:req.body.trackTimes,
      fastestTimeIdx:req.body.fastestTimeIdx,
      totalTime:req.body.totalTime,
      marker:req.body.marker
    });
    console.log(newSession)
    newSession.save();
    res.json({message:'CONFIRM'});
  })
  .catch((error) => {

      console.log(req.body)
      var newUser = new user({
        name:req.body.user.name,
        id:req.body.user.id,
        email:req.body.user.email
      });
      newUser.save();

    var newSession = new lap({
      user:newUser._id,
      track_id:req.body.trackID,
      lapTimes:req.body.trackTimes,
      fastestTimeIdx:req.body.fastestTimeIdx,
      totalTime:req.body.totalTime,
      marker:req.body.marker
    });
    console.log(newSession)
    newSession.save();
    res.json({message:'CONFIRM'});
    console.log('No User Found Route')
  })

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
