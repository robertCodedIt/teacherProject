import React, { Component } from 'react'
import {Form,Button} from "react-bootstrap"
export default class NewTodo extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         author:"",
         description:"",
         due_date:"",
         completed:false
      }
    }
  render() {
    return (
      <div>
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Todo Description</Form.Label>
    <Form.Control type="text" placeholder="Enter todo Description" />
    <Form.Text className="text-muted">
     please make this very brief [max characters : 255]
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Due Date</Form.Label>
    <Form.Control type="date" placeholder="Due Date" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Add Todo
  </Button>
</Form>

      </div>
    )
  }
}
