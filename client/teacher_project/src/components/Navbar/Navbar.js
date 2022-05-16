import React from "react";
import { Button } from "react-bootstrap";
import LoginButton from "../login";
import LogoutButton from "../logout";
class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first: 0,
    };
  }
  render() {
    return (
      <nav className="NavBarItems">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/alltodos">All Todos</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
        {this.props.isAuthenticated ? (
          <Button onClick={this.props.loginWithRedirect}>Log in</Button>
        ) : (
          <Button
            onClick={() =>
              this.props.logout({ returnTo: window.location.origin })
            }
          >
            Log out
          </Button>
        )}
      </nav>
    );
  }
}

export default Navbar;
