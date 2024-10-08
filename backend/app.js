//Import Packages
const express = require('express');
const fs = require('fs')
const { exec } = require("child_process");
const path = require('path');
const morgan = require('morgan');
const crypto = require('crypto')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const secret = "cEJpFKy2BVzMRZXaaHjpc";

// For these headers, a sigHashAlg of sha1 must be used instead of sha256
// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'




const trackRoute = require('./routes/tracks');
const timeRoute = require('./routes/timing');
const userRoute = require('./routes/users');
const paymentRoute = require('./routes/payments');
//Init DotENV
dotenv.config();

//Initalise App
const app = express();

//Connect Database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.log('Connection Failed' + err);
  });




//Initalise Morgan and BodyParser
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
});

//Assign Routes
function verifyPostData(req, res, next) {
  if (!req.body) {
    return next('Request body empty')
  }

  const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
  const hmac = crypto.createHmac(sigHashAlg, secret)
  const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8')
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
  }

  return next()
}



app.get("/ping",(req,res,next)=>{
  console.log(req.body)
  res.send('OK12')
});
app.use("/", express.static(path.join(__dirname,"../dist/leaderboard")));


app.use("/api/track",trackRoute);
app.use("/api/user",userRoute);
app.use("/api/time",timeRoute);
app.use("/api/pay",paymentRoute);

app.post("/update",verifyPostData,(req,res,next) => {
  console.log(req.body)
  res.send('OK')
  exec(`cd /home/ubuntu/chairity-event-leaderboard &&
  git reset --hard &&
  git pull &&
  sudo pm2 restart server
  `, (error, stdout, stderr) => {

    console.log(`stdout: ${stdout}`);
});


})

module.exports = app;
