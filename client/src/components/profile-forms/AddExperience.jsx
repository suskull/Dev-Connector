import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import {connect} from 'react-redux'
import { setAlert } from "../../actions/alert";
const AddExperience = ({profile : {profile}, addExperience, history, setAlert }) => {

    // const {experience} = profile
  const [formData, setFormData] = useState({
      title: "",
      compnay: "",
      location: "",
      from: "",
      current: false,
      to: "",
      description: ""
  })  

  const {
      title, company, location, from, to, description,current
  } = formData

  const onChange = e => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value

      })
  }

  const onSubmit = e => {
      e.preventDefault();

    if(from ==="" || current ===false) {
        return setAlert('You must fill in Current or To Date', 'danger')
    }

    addExperience(formData, history, profile?.experience.length > 0 ? true : false )
  }

  return (
    <>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} required onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} required onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => setFormData({...formData, current: !current})}
             
            />{" "}
            Current Job
          </p>
        </div>
        {current ? null : (
          <>
            <div class="form-group">
              <h4>To Date</h4>
              <input type="date" name="to" value={to} onChange={e => onChange(e)}/>
            </div>
       
          </>
        )}
             <div class="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={description}
                onChange={e => onChange(e)}
              ></textarea>
            </div>

        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard"> Go Back</Link>

      </form>
    </>
  );
};

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {addExperience,setAlert})(withRouter(AddExperience));
