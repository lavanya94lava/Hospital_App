const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
//connection to mongoDB
const db = require('./config/mongoose');


//use this middleware to read the urlencoded values
app.use(express.urlencoded());

//to parse all the json data coming in requests
app.use(bodyParser.json());
//this contains all the routes 
app.use('/',require('./routes'));

//connect your server
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server${err}`);
    }
    console.log(`Server is running on port ${port}`);
});

module.exports = app;