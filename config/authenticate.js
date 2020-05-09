 
const jwt = require('jsonwebtoken');

//use jwt to authenticate the user, 
module.exports.authenticate = function(req,res,next){
    if(req.headers.token){
        try {
            //verify the token and get doctor out of it .
            const token = jwt.verify(req.headers.token,"hospital");
            //make doctor the user
            req.user = token._id;
            console.log(req.user);
            next();
        } catch (err){
            return res.json(400,{
                message:"invalid token"
            })
        }
    }else{
        return res.json(400,{
            message:"route is protected"
        })
    }
}