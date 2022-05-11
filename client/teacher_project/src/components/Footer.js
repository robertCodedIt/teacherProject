import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       first:0,
    }
  }
  render() {
    return (
      <nav className="NavBarItems">
        &copy; 2022 Robert Armstrong: CodeCrew, Memphis,Tn
      </nav>
    );
  }
}
export default Footer;