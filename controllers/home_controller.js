module.exports.home = (req,res) =>{
    //to see the cookies
    //to modify cookies at sserver side
    res.cookie('anirudh',25);
    console.log(req.cookies);
    res.render('Home',{
        title : "anirudh"
    });
}

