require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const Todo = require('./models/Todo')
const mongoose = require("mongoose");
const connectionStr = process.env.DB_CONNECT_STRING

/* -------------------------------------------------------------------------- */




mongoose.connect(connectionStr,()=>{
    console.log("Connected to mongoose")
})
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */


app.head("/", cors(), (req, res) => {
  console.info("HEAD success");
  res.sendStatus(204);
});
app.get("/",cors(),(req,res)=>{
    console.log('all got');
    res.send({ 
        message:{
          name:"all clear",
          status:200,  
        }
    })
})
app.head("/alltodos", cors(), (req, res) => {
  console.info("HEAD success");
  res.sendStatus(204);
});
app.get("/alltodos", cors(), async(req, res) => {
  console.info("GET route successful");
  let todos = await Todo.find({})
  res.json(todos)
});









const optionsTwo = {
  origin: true,
  methods: ["POST"],
  credentials: true,
  maxAge: 3600
};
app.options("/newtodo", cors(optionsTwo));

app.post("/newtodo", cors(optionsTwo),bodyparser.json(),async(req, res) => {
  console.info("post route successful");
  const newtodo = new Todo( req.body)
  await newtodo.save(function(err){
      if(err){
          console.info(err)
      }
  })
  res.send({
    message: newtodo
  });
});

/* -------------------------------------------------------------------------- */

app.options("/deletetodo:id", cors());
app.delete("/deletetodo/:id", cors(), (req, res) => {
  console.info("DELETE route successful");
  res.send({
    message: "delete todos here"
  });
});




  const port = process.env.SERVER_PORT_NUMBER || 3031;

  app.listen(port, () => {
    console.log("Express server listening on port " + port + ".");
  });
