const express = require("express");
const app = express();
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser');//cookie needs to parsed in the middleware
const expressLayouts = require('express-ejs-layouts');
const PORT = 3001;
//from this index.js i will go to routes/index.js and from there to further routes.

app.use(express.urlencoded());
// app.use(expressLayouts)
app.use(cookieParser());
//use express Router
app.use('/',require('./routers/index'));

//setting the view engine ejs
app.set('view engine','ejs')
app.set('views','./views')

app.listen(PORT,(err)=>{
    if(err){
        console.log("server not working");
        return;
    }
    console.log("server is up and running")
})


//flow of routing...server is index.js prr sbse pehle aaya fir meine use routers/index.js prr bhej diya...yha se mei baaki routers prr bhejuga
//or un routers mei unse related controller ke functions ko call kruga.routers/index.js is like a place where all the request mappings are available.