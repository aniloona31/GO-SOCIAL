const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/GO-SOCIAL');

const db = mongoose.connection;

//error on connection
db.on('error',console.error.bind("connection to mongodb failed"));

//no error on connection
db.once('open',()=>{
    console.log("db is connected");
})