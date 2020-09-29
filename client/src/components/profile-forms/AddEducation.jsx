import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import {connect} from 'react-redux'
import { setAlert } from "../../actions/alert";

const AddEducation = ({profile : {profile}, addEducation, history, setAlert }) => {

    // const {experience} = profile
  const [formData, setFormData] = useState({
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      current: false,
      to: "",
      description: ""
  })  

  const {
      school, degree, fieldofstudy, from, to, description,current
  } = formData

  const onChange = e => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value

      })
  }

  const onSubmit = e => {
      e.preventDefault();

    if(from === "" || current === false)  {
        return setAlert('You must choose to Date or Current', 'danger')
    }

    addEducation(formData, history, profile?.education.length > 0 ? true : false )


  }

  console.log(formData);
  return (
    <>
      <h1 class="large text-primary">Add An Education</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="*School or Bootcamp" name="school" value={school} required onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} required onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} required onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} required onChange={e => onChange(e)}/>
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
            Current School or Bootcamp
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
                placeholder="Education Description"
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
export default connect(mapStateToProps, {addEducation, setAlert})(withRouter(AddEducation));
