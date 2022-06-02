const express = require("express");
const app = express();
const PORT = 3001;
//from this index.js i will go to routes/index.js and from there to further routes.

//use express Router
app.use('/',require('./routers/index'));


app.listen(PORT,(err)=>{
    if(err){
        console.log("server not working");
        return;
    }
    console.log("server is up and running")
})