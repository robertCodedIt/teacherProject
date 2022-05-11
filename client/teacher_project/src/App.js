import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./components/Todo";
import Home from "./components/Home";
import NewTodo from "./components/NewTodo";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer"
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInit: "L",
      todos:[]
    };
  }
  getAllTodos = async()=>{
    try{
        const url = "http://localhost:3030/alltodos"
        await axios.get(url)
        .then((response)=>{
            console.log(response.data)
            this.setState({todos: response.data})
               return response.data
        })
        .catch((error)=>{
            console.log(error)
        })
     
    }
    catch(err){
        console.log(err)
    }
}

  render() {
   
    return (
      <>
        <Navbar  />
      
        <Router>
          <Routes>
            <Route path="/" element={<Home call={this.getAllTodos} data={this.state.todos}/>} />
            <Route path="/todos" element={<Todo />} />
            <Route path="/newtodo" element={<NewTodo />} />
          </Routes>
        </Router>
        <Footer/>
      </>
    );
  }
}

export default App;
