import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
const Navbar = (props) => {
  const authNavbar = () => {
    return (
      <ul>
        <li>
          <a href='/' onClick={() => props.logout()}>
            <i className="fas fa-sign-out-alt"></i>
            <span>  Logout</span>
          </a>
        </li>
      </ul>
    )
  }

  const guestNavbar = () => {
    return (
        <ul>
          <li>
            <Link to="profiles">Developers</Link>
          </li>
          <li>
            <Link to="register">Register</Link>
          </li>
          <li>
            <Link to="login" >Login</Link>
          </li>
        </ul>
    )
  }
  return (
    <>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i class="fas fa-code"></i>
          </Link>
        </h1>
        {props.isAuthenticated ? authNavbar() : guestNavbar()}
      </nav>
    </>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {logout})(Navbar);
