const User = require('../../../model/User');
const jwt = require('jsonwebtoken');

module.exports.index = (req,res) => {
    return res.json(200,{
        message : "u are at users api",
        users : []
    })
}

module.exports.createSession = async (req, res) => {
    try{
        // console.log(req);
        let user = await User.findOne({email : req.body.email});
        // console.log(user);
        if(user.password !== req.body.password){
            return res.status(401).send({
                message : "bad cridentials"
            });
        }

        return res.status(200).send({
            message : "successfully signed in",
            data : {
                token : jwt.sign(user.toJSON(),'anirudh',{expiresIn : '1000000'})
            }
        })
    }catch(err){
        console.log("wrong credintials");
        return res.status(401).send({
            message : "bad cridentials"
        })
    }
}
