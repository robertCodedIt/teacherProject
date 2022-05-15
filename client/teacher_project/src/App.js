import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./components/Todo";
import Home from "./components/Home";
import NewTodo from "./components/NewTodo";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import {useAuth0} from '@auth0/auth0-react';

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const [todos, setTodos] = useState([]);
  const getAllTodos = async () => {
    try {
      const url = "http://localhost:3030/alltodos";
      await axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          setTodos(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        
        <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home call={getAllTodos} data={todos} />} />
          <Route path="/todos" element={<Todo />} />
          <Route path="/newtodo" element={<NewTodo />} />
        </Routes>
      </Router>
      <Footer />
    </>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}
//   return (
   
//   );
// }

export default App;
