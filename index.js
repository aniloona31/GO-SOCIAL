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


//flow of routing...server is index.js prr sbse pehle aaya fir meine use routers/index.js prr bhej diya...yha se mei baaki routers prr bhejuga
//or un routers mei unse related controller ke functions ko call kruga.routers/index.js is like a place where all the request mappings are available.