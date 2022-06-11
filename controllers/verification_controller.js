const VerificationToken = require('../model/VerificationToken');
const User = require('../model/User');
const crypto = require('crypto');
const queue = require('../config/kue');
const resetWorker = require('../workers/reset_worker');
const resetMailer = require('../mailer/reset_mailer');

module.exports.redirectToReset = (req,res) => {
    res.render('password_reset');
}

module.exports.resetPassword = async(req,res) => {
    const email = req.body.email;

    let user = await User.findOne({"email" : email});
    // console.log(user);
    if(user){
        let cryptoToken = crypto.randomBytes(20).toString('hex');
        await VerificationToken.findOneAndDelete({"user" : user._id});
        
        await VerificationToken.create({
            user : user._id,
            valid : true,
            token : cryptoToken
        })
        const data = {
            email : email,
            url : `localhost:3001/users/reset/${cryptoToken}`
        }
        let job = queue.create('reset-mail',data).save((err) => {
            if(err){
                console.log(err);
                return ;
            }
            console.log(job.id);
        })
        return res.redirect('back');
    }
}

module.exports.verify = async (req,res) => {
    const token = req.params.token;
    console.log(token);
    const verificationToken = await VerificationToken.findOne({"token" : token});
    if(verificationToken && verificationToken.valid == true){
        console.log(verificationToken);
        verificationToken.valid = false;
        verificationToken.save();
        return res.render('change_password',{user : verificationToken.user});
    }
    return res.redirect('/');
    
}

// module.exports.goToChangePassword = (req,res) =>{
//     res.render('change_password');
// }

module.exports.updatePassword = async(req,res) => {
    // console.log('hello');
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.body.user,{password : req.body.new_password})
    console.log(user);
    res.redirect('/');
}