const queue = require('../config/kue');
const resetMailer = require('../mailer/reset_mailer');

queue.process('reset-mail',(job,done) => {
    console.log(job.data);

    resetMailer.resetMail(job.data);

    done();
});