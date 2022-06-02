const express = require("express");
const app = express();
const PORT = 3001;


app.listen(PORT,(err)=>{
    if(err){
        console.log("server not working");
        return;
    }
    console.log("server is up and running")
})