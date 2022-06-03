const { default: mongoose } = require('mongoose')
const mogoose = require('mongoose')
const userSchema = new mogoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    }
},{
    timestamps : true
})
//timestamps true maintains created at and updated at
const User = mongoose.model('User',userSchema);

module.exports = User;