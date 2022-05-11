import axios from "axios";
import React, { Component } from "react";

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author:"robert from react side",
      completed: false,
      todoContent: "",
      todo_due_date:"",
     
    };
  }
  checkedChange = (e) => {
    if (this.state.todoContent === "") {
      alert("there is nothing todo");
      e.target.checked = false;
    }
    else if (e.target.checked === false) {
      this.setState({ completed: false });
    } else  {
      this.setState({ completed: true });
    }
  };
  onInputChange = (e) => {
    this.setState({ todoContent: e.target.value });
  };
  handleDateChange = (e) => {
    this.setState({ todo_due_date: e.target.value });
  };
  onSubmit =async (e) => {
    e.preventDefault();
    if (this.state.completed === false && this.state.todoContent !== "") {
      alert(this.state.todoContent);
     
try{
  const todoObject = {
    author:this.state.author,
    description:this.state.todoContent,
    due_date:this.state.todo_due_date,
    completed:this.state.completed
  }
  const url = "http://localhost:3030/newtodo"
  await axios.post(url,todoObject)
  .then(response => console.log(response))
  .catch(err => console.log(err))
}catch(e){
  console.log(e)
}
    } else {
      alert("todo content is empty");
    }
  };
  render() {
    return (
      <div>
        {this.state.completed ? (
            <div>
          <form className="todo-form completed">
            <legend className="todo-legend completed">Todo</legend>
            <label className="todo-label completed">Todo Description:</label>
            {/* <input type="text" /> */}
            <p className="completed-todo-description">
              {" "}
              {this.state.todoContent}
            </p>
            <label className="todo-due_date completed">
             Due Date : 
            </label>
            <p>
              
              {this.state.todo_due_date}
            </p>

            <label className="todo-label completed">Completed</label>
            <input
              className="checkbox"
              onChange={this.checkedChange}
              type="checkbox"
            />
            <footer>{new Date().toDateString()}</footer>
          </form>
          </div>
        ) : (
            <div>
          <form className="todo-form not-completed">
            <legend className="todo-legend">Todo</legend>
            <label className="todo-label">Todo Description:</label>
            <input onChange={this.onInputChange} type="text" />
         <div>
         <label className="todo-due_date todo-label">       Due Date     </label>
        
      
        <input type="text" placeholder="duedate" maxLength="255"  onChange = {this.handleDateChange}/>
         </div>
            
          
            <label className="todo-label">Completed</label>
            <input
              className="checkbox"
              onChange={this.checkedChange}
              type="checkbox"
            />
            <input type="submit" onClick={this.onSubmit} value="new todo" />
            <footer>{new Date().toDateString()}</footer>
          </form>
          </div>
        )}
      </div>
    );
  }
}
