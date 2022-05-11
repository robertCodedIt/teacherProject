const mongoose = require("mongoose");


const TodoSchema = mongoose.Schema({
    author:{
        type:String,
        required:true,
    },
  description: {
type:String,
    required: true,
    maxLength: [255,"max length is 255 characters"],
  },
  due_date: {
    required: true,
    type:Date,
  },
  completed: { required: true, type: Boolean },

});

let Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
