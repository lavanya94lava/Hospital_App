// this file contains all the functionalities of a doctor(user), like registering a doctor, loggin in one etc.
const User = require('../../../models/doctor');
const Patient = require('../../../models/patient');
const jwt = require('jsonwebtoken');


// register a new user
module.exports.register = async function(req,res){
    
    // req.body should have all the fields filled
    if(!req.body.name||!req.body.email || !req.body.password){
        
        return res.json(200,{message:"Please fill all the required fields"});
    }
    try{
        // check email
        await User.findOne({
            email:req.body.email
        },function(err, user){
            if(err){
                return res.json(400,{
                    message:"USername already taken"
                });
            }
            // if email id exists then make the user choose a different ID
            if(!user){
                User.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                });
                return res.json(200,{
                    message:"doctor created successfully"
                
                });
            }
        });
    }
    catch(err){
        return res.json(400,{
            data:{
                message:"Error in creating user"
            }
        });
    }
}

//login the user using credentials
module.exports.login = async function(req,res){
    // fill up all the details
    if(!req.body.email || !req.body.password){
        return res.json(400,{
            message:"fill all fields"
        });
    }
    try{
        // find the doctor
        const doctor = await User.findOne({email:req.body.email});
        
        // check if credential are good or not
        if(!doctor||doctor.password!= req.body.password){
            return res.json(422,{
                message:"Either email or password is incorrect"
            });
        }
        return res.json(200,{
            message:"Sign in successful",
            //create a JSON token to verify the user later 
            data:{
                token:jwt.sign(doctor.toJSON(),"hospital",{expiresIn:'3h'}),
            }
        });
    }
    catch(err){
        return res.json(500,{
            message:"Error in logging in, Internal server error"
        });
    }
}

