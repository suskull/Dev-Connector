import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {getProfileById} from '../../actions/profile'
import {connect} from 'react-redux'
const ProfileItem = ({ profile, getProfileById }) => {
  return (
    <>
      <div className="profile bg-light" key={profile._id}>
        <img
          className="round-img"
          src={profile?.user?.avatar}
          alt=""
        />
        <div>
          <h2>{profile.user.name}</h2>
          <p>{profile.bio}</p>
          <p>{profile.location}</p>
          <Link to={`profile/${profile.user._id}`} className="btn btn-primary"  >
            View Profile
          </Link>
        </div>

        <ul>
          {profile?.skills?.map((e, index) => (
            <li className="text-primary" key={index}>
              <i className="fas fa-check"></i>
              {e}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default connect(null,{getProfileById})(ProfileItem);
