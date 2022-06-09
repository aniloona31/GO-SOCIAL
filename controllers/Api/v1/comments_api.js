module.exports.index = (req,res) => {
    return res.json(200,{
        message : "u are at commetns api",
        comments : []
    })
}