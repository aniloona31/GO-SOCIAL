const express = require("express");
const app = express();
const db = require('./config/mongoose')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const passportLocal = require('./config/passport-local-strategy');
const PORT = 3001;
//from this index.js i will go to routes/index.js and from there to further routes.

//add sass middleware before the server starts.
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'expanded',
    prefix : '/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());
//use express Router

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //change secret while deploying
    secret : 'anirudh',
    saveUninitialized : false,
    resave : false,
    cookie:{
        maxAge : (1000 * 60 * 100),
    },
    //to solve the problem of storing session in memory we store it in database
    store : MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/GO-SOCIAL',
        autoRemove : 'disabled'
    },(err) => {
        if(err){
            console.log(err , 'mongo store failed to connect');
            return;
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//routes should be initialized after this passport vaaali cheeze. order does matter.
app.use('/',require('./routers/index'));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));


app.listen(PORT,(err)=>{
    if(err){
        console.log("server not working");
        return;
    }
    console.log("server is up and running")
})


//flow of routing...server is index.js prr sbse pehle aaya fir meine use routers/index.js prr bhej diya...yha se mei baaki routers prr bhejuga
//or un routers mei unse related controller ke functions ko call kruga.routers/index.js is like a place where all the request mappings are available.