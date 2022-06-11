const queue = require('../config/kue');

const commentMailer = require('../mailer/comments_mailer');

//process function tells the worker whenever a new task is added to the queue you have to use this process function
queue.process('emails',(job,done) => {
    console.log(job.data);

    commentMailer.newComment(job.data);

    done();
})