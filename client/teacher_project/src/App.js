import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./components/Todo";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInit: "L",
    };
  }
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route path = "/todo" element={<Todo/>}/>
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
