import React from "react";
import { MenuItems } from "./MenuItems";
class Navbar extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       first:0,
    }
  }
  render() {
    return (
      <nav className="NavBarItems">
        <h1 className="navbar-logo" onClick={this.props.home}>Todo</h1>
      
        <ul>
          {MenuItems.map((item, idx) => {
            return (
              <li key={idx}>
                  
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
export default Navbar;
