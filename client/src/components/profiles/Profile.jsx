import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import {getProfileById} from '../../actions/profile'

const Profile = ({ profile: { profile, repos, isLoading }, match, getProfileById }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [match.params.id])
  return (
    <>
      <Link to="profiles" className="btn btn-light">
        Back To Profiles
      </Link>

      <div className="profile-grid my-1">
        {/* <!-- Top --> */}
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h1 className="large">{profile?.user?.name}</h1>
          <p className="lead">{profile?.bio}</p>
          <p>{profile?.user?.location}</p>
          <div className="icons my-1">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>

        {/* <!-- About --> */}
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile?.user?.name}'s Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
            neque modi perspiciatis similique?
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>

          <div className="skills">
            {profile?.skills?.map((skill, index) => (
              <div className="p-1" key={index}>
                <i className="fa fa-check" key={index}></i> {skill}
              </div>
            ))}
          </div>
        </div>

        {/* <!-- Experience --> */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile?.experience?.map((e) => (
            <div key={e._id}>
              <h3 className="text-dark">{e.company}</h3>
              <p>
                <Moment format="YYYY/MM/DD">{e.from}</Moment> -{" "}
                {e.to ? <Moment>{e.from}</Moment> : "Current"}
              </p>
              <p>
                <strong>Position: </strong>
                {e.title}
              </p>
              <p>
                <strong>Description: </strong>
                {e.description}
              </p>
            </div>
          ))}
        </div>

        {/* <!-- Education --> */}
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile?.education?.map((e) => (
            <div>
              <h3>{e.school}n</h3>
              <p>
                <Moment>{e.from}</Moment> -{" "}
                {e.to ? <Moment>{e.to}</Moment> : "Current"}
              </p>
              <p>
                <strong>Degree: </strong>
                {e.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {e.fieldofstudy}
              </p>
              <p>
                <strong>Description: </strong>
                {e.description}
              </p>
            </div>
          ))}
        </div>

        {/* <!-- Github --> */}
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Repo One
                </a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Repo Two
                </a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {getProfileById})(Profile);
