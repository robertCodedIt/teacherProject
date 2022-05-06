const App =require("./index");
const express =require('express'); 
const expressApp   = new App(express);

const router = expressApp.router();

router.get('/', function(req, res){
    res.send({
        status:res.statusCode.toString(),
        body:{
            message:"welcome",
            code:res.statusCode.toString(),
            time:new Date().toDateString()
        }
    })
})
module.exports = router;