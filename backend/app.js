//Import Packages
const express = require('express');
const fs = require('fs')
const { exec } = require("child_process");
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Init DotENV
dotenv.config();

//Initalise App
const app = express();

//Connect Database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
.then(() => {
  console.log('Connected to Database');
})
.catch((err) => {
  console.log('Connection Failed' + err);
});

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


//Initalise Morgan and BodyParser
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Assign Routes

app.get("/ping",(req,res,next)=>{
  res.send('OK')
});

app.get("/update",(req,res,next) => {
  exec("cd /home/ubuntu/chairity-event-leaderboard/scripts && sudo ./update.sh ", (error, stdout, stderr) => {

    console.log(`stdout: ${stdout}`);
});
})

module.exports = app;
