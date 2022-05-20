import React from "react";
import "./App.css";
import { Form, Button, Card } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Todo from "./components/Todo";
// import Home from "./components/Home";
// import NewTodo from "./components/NewTodo";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import Profile from "./components/profile";
function App() {
  //server url
  const url = process.env.REACT_APP_SERVER_URL || "https://todo-list-server-code-crew.herokuapp.com";
  // deconstruct auth obj
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  //state variables and hooks
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editedText, SetEditedText] = useState("");
  const [dueDate, setDueDate] = useState("");
  useEffect(() => {
    const lsTodos = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(lsTodos);
    if (loadedTodos) {
      getAllTodos();
      setTodos(loadedTodos);
    }
  }, []);
  useEffect(() => {
    const jsonTodos = JSON.stringify(todos);
    localStorage.setItem("todos", jsonTodos);
  }, [todos]);
  // get todos from serverDataBase
  async function getAllTodos() {
    try {
      await axios
        .get(`${url}/alltodos`)
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
  }

  // toggle complete
  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.date_id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });
    setTodos(updatedTodos);
  };
  const editTodo = async (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.date_id === id) {
        todo.description = editedText;
      }

      return todo;
    });
    // update not working(db)
    // await axios.put(`${url}/updatetodo/${id}`,editedText)
    setTodos(updatedTodos);
    setTodoEditing(null);
    SetEditedText("");
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form sent");
    let newTodo = {
      author: user.email,
      description: todo,
      due_date: dueDate,
      completed: false,
      date_id: new String(new Date().getTime()),
    };
    try {
      await axios.post(`${url}/newtodo`, newTodo);
    } catch (e) {
      console.log(e);
    }
    setTodos([...todos].concat(newTodo));
    setTodo("");
    setDueDate("");
  };
  //delete Todo
  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.date_id !== id);
    axios.delete(`${url}/deletetodo/${id}`, (response) => {
      console.log(response);
    });
    setTodos(updatedTodos);
  };

  //check auth
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  } else if (isAuthenticated) {
    return (
      <div className="App">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
        <>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
                value={todo}
                placeholder="Enter todo Description"
              />
              <Form.Text className="text-muted">
                please make this very brief [max characters : 255]
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
                value={dueDate}
                type="date"
                placeholder="Due Date"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Todo
            </Button>
          </Form>
          <Button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </Button>
        </>

        <div className="todoBox">
          {todos.map((el, idx) => {
            return (
              <Card style={{ width: "18 rem" }} key={idx}>
                {todoEditing === el.date_id ? (
                  <input
                    type="text"
                    onChange={(e) => {
                      SetEditedText(e.target.value);
                    }}
                    value={editedText}
                  />
                ) : (
                  <Card.Header>{el.description}</Card.Header>
                )}

                <Card.Body>
                  <Button
                    onClick={() => deleteTodo(el.date_id)}
                    variant="danger"
                  >
                    DELETE
                  </Button>

                  {todoEditing === el.date_id ? (
                    <Button
                      onClick={() => {
                        editTodo(el.date_id);
                      }}
                    >
                      Submit Edit
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setTodoEditing(el.date_id)}
                      variant="warning"
                    >
                      EDIT
                    </Button>
                  )}
                  <label>Complete</label>
                  <input
                    checked={todo.completed}
                    onChange={() => {
                      toggleComplete(el.date_id);
                    }}
                    type="checkbox"
                  />
                </Card.Body>
                <Card.Footer>{el.due_date}</Card.Footer>
              </Card>
            );
          })}
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="notLoggedIn">
        <Navbar />
        <Button onClick={loginWithRedirect}>Log in</Button>
        <Footer />
      </div>
    );
  }
}

export default App;
