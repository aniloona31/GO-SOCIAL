const mongoose = require('mongoose');

const verificationTokenSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    token : {
        type : String
    },
    valid : {
        type : Boolean
    }
});

const VerificationToken = mongoose.model('VerificationToken',verificationTokenSchema);
module.exports = VerificationToken;