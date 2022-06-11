const nodemailer = require('../config/nodemailer');

// exports.newComment is also used
module.exports.newComment = (comment) => {
    // console.log('inside comment mailer');
    let htmlString = nodemailer.renderTemplate({comment : comment},'/comments/new_comment.ejs');
    
    nodemailer.transporter.sendMail({
        from : 'placefinder22@gmail.com',
        to: comment.user.email,
        subject : "new comment published",
        html : htmlString
    },(err,info) => {
        if(err){
            console.log('error in sending mail',err);
            return;
        }

        console.log('message sent ', info); 
    })
    return;
}