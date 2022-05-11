import React, { useState } from 'react'
import {Card,InputGroup} from "react-bootstrap"
import MYDATA from "./data.ts"
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "react-spring"
import NewTodo from "./NewTodo"


import styles from './styles.module.css'

export default function Home(props) {



  const [open, set] = useState(false)

  const springApi = useSpringRef()
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink',
    },
  })
  
const data = props.data.map((todo,idx)=>{
  return(
                        <Card className="todo-card" key={idx} id={`todo-card`+idx} style={{margin:"1rem",width:"18rem"}}>
                        <Card.Header>
                            Todo
                        </Card.Header>
                        <Card.Body>
                            <Card.Subtitle>Todo Description</Card.Subtitle>
                            <p>{todo.description}</p>
                            <Card.Subtitle>Due Date:</Card.Subtitle>
                            <h6>{todo.due_date}</h6>
                            
                            </Card.Body>
                        
                        <Card.Footer>
                            <label>Complete</label> 
                            <InputGroup.Checkbox onChange/>
                            </Card.Footer>
                        </Card>)
}) 

  const transApi = useSpringRef()

  const transition = useTransition(open ? MYDATA: <NewTodo/>, {
    ref: transApi,
    trail: 400 / props.data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ])

  return (
    <div onClick={()=>{props.call()
    
    console.log(props.data)}} className={styles.wrapper}>
        {data}
      <animated.div 
        style={{ ...rest, width: size, height: size }}
        className={styles.container}
        onClick={() => set(open => !open)}>
        {transition((style, item) => (
          <animated.div
            className={styles.item}
            style={{ ...style, background: item.css }}
          />
        ))}
      </animated.div>
    
    </div>
  )
}













// import React, { Component } from 'react'
// import {Card,Button,InputGroup} from "react-bootstrap"

// export default class Home extends Component {
//     constructor(props) {
//       super(props)
    
//       this.state = {
//          todos:[]
//       }
//     }
   
//     componentWillMount(){
//         this.props.call()
        
//     }
//   render() {

//     return (
//       <div className="todo-cards-div">
//           {

//               props.data.map((todo,idx)=>{
//                   return(
//                     <Card className="todo-card" key={idx} id={`todo-card`+idx} style={{margin:"1rem",width:"18rem"}}>
//                     <Card.Header>
//                         Todo
//                     </Card.Header>
//                     <Card.Body>
//                         <Card.Subtitle>Todo Description</Card.Subtitle>
//                         <p>{todo.description}</p>
//                         <Card.Subtitle>Due Date:</Card.Subtitle>
//                         <h6>{todo.due_date}</h6>
                        
//                         </Card.Body>
                    
//                     <Card.Footer>
//                         <label>Complete</label> 
//                         <InputGroup.Checkbox onChange/>
//                         </Card.Footer>
//                     </Card>
//                   )
//               })
//           }
         
//          <a href = "/newtodo" alt="new todo"><Button>New Todo</Button></a>
//       </div>
//     )
//   }
// }
