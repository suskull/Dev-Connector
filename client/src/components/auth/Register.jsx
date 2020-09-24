import React, { useState } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import register from '../../actions/auth'
const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return props.setAlert("password does not match", "danger");
    }


    props.register({name,email,password})



    // const newUser = {
    //     name,
    //     email,
    //     password
    // }
    // try {
    //     const config = {
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     }
    //     const body = JSON.stringify(newUser)
    //     const res = await axios.post('/api/users', body, config)
    //     console.log(res.data)

    // } catch (error) {
    //     console.log(error)
    // }

  };

  console.log(props.auth)
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        {name}
        {email}
        {password}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
     
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {setAlert,register})(Register);
