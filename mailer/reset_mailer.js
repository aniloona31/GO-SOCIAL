const nodemailer = require('../config/nodemailer');

module.exports.resetMail = (data) => {
    console.log(data);
    nodemailer.transporter.sendMail({
        from : 'placefinder22@gmail.com',
        to: data.email,
        subject : "reset password",
        html : `<h1>verify this is your account by clicking on the given link</h1> ${data.url}`
        },(err,info) => {
        if(err){
            console.log('error in sending mail',err);
            return;
        }

        console.log('message sent ', info); 
    })
    return;
}