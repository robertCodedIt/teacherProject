import React, { Component } from "react";
import { Card, Button, InputGroup } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  componentWillMount() {
    this.props.call();
  }
  render() {
    return (
      <div className="todo-cards-div">
        {this.props.data.map((todo, idx) => {
          return (
            <Card
              className="todo-card"
              key={idx}
              id={`todo-card` + idx}
              style={{ margin: "1rem", width: "18rem" }}
            >ghp_4w8IAJBSOFBzQIRsyPbwtm2xN8d4Kz392wi5
              <Card.Header>Todo</Card.Header>
              <Card.Body>
                <Card.Subtitle>Todo Description</Card.Subtitle>
                <p>{todo.description}</p>
                <Card.Subtitle>Due Date:</Card.Subtitle>
                <h6>{todo.due_date}</h6>
              </Card.Body>

              <Card.Footer>
                <label>Complete</label>
                <InputGroup.Checkbox onChange />
              </Card.Footer>
            </Card>
          );
        })}

        <a href="/newtodo" alt="new todo">
          <Button>New Todo</Button>
        </a>
      </div>
    );
  }
}
