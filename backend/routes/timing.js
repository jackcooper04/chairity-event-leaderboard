const express = require("express");
const dotenv = require("dotenv");
const leaderboard = require('../models/leaderboard');
const session = require('../models/session');
const tracks = require('../models/tracks');
const user = require('../models/user');
dotenv.config();

const router = express.Router();


router.post("/", (req, res, next) => {

    const newSession = new session({
        lapTimes: req.body.session.laptimes,
        marker: req.body.session.marker,
        fastestTime: req.body.session.fastest,
        totalTime: req.body.session.total
    });

    newSession.save().then((result)=>{
       var id = result._id.toString();
        var newSessionId = id;
        const newLeader = new leaderboard({
            sessionID: newSessionId,
            user: req.body.user,
            track_id: req.body.track_id
        });
        newLeader.save();
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    })
       
       
    

})

router.get("/",(req,res,next)=> {
    var selectedTracks = req.query.track;
    tracks.findOne({track_name:selectedTracks   })
    .then((resultT) => {
        //console.log(resultT)
        if (!resultT){
            res.status(404).json({message:'TrackNotFound'});
            return;
        };
        var trackID = resultT._id.toString();
        leaderboard.find({track_id:trackID})
        .then((result) => {
            var leaders = result;
            var sessionArray = new Array();
            var userArray = new Array();
            for (leaderIdx in leaders){
                var leaderID = leaders[leaderIdx].sessionID;
                var userId = leaders[leaderIdx].user;
                userArray.push(userId);
                sessionArray.push(leaderID);
            };
            session.find().where('_id').in(sessionArray)
            .then((result)=>{
                console.log(userArray)
                user.find().where('_id').in(userArray)
                .then((userResult) => {
                    var finalArray = new Array();
                 //   console.log(userResult)
                    for (resultIdx in result){
                        var obj = {
                            lapData:result[resultIdx],
                            userData:userResult[resultIdx]
                        };
                        finalArray.push(obj);
                    };
                    res.json({times:finalArray})
                })
            })
        })
    })
})
module.exports = router;