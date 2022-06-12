const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //to dynamically determine the reference to a model we use refPath : 'onModel'
    likeable : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel'
    },
    //in sql i would not create dynamic refernce here i can.
    //this field is used to define the type of the liked object since this is a dynamic reference
    onModel:{
        type: String,
        required : true,
        enum : ['Post','Comment']
    }

},{
    timestamps : true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;
