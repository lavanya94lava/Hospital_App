const express = require('express');
const app = express();
const port = 8000;
const passport = require('passport');
const passportJwt = require('passport-jwt');
const bodyParser = require("body-parser");
//connection to mongoDB
const db = require('./config/mongoose');


app.use(passport.initialize());
//use this middleware to read the urlencoded values
app.use(bodyParser.urlencoded({ extended: false }));

//to parse all the json data coming in requests
app.use('/',require('./routes'));

//connect your server
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server${err}`);
    }
    console.log(`Server is running on port ${port}`);
});

module.exports = app;