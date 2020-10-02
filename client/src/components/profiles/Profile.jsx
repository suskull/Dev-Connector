import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { getAuthUser } from "../../actions/auth";
import Spinner from "../layout/Spinner";
import ProfileTop from "../profiles/ProfileTop";
import ProfileAbout from "../profiles/ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileRepos from "./ProfileRepos";
import { Skeleton } from '@material-ui/lab'
const Profile = ({
  profile: { profile, isLoading },
  match,
  getProfileById,
  auth,

}) => {
  useEffect(() => {
    setTimeout(() => {
      getProfileById(match.params.id);
    }, 1000);
  }, [match.params.id]);


  return (
    <>
      {!profile ? (
        <>
          <Skeleton variant="rect" height={40} width={160} animation="wave"/>
          <div className="profile-grid my-1">
            <div className="profile-top bg-primary p-2" style={{backgroundColor: "#f6f6f6"}}>
              <Skeleton variant="rect" height={450} animation="wave"/>
            </div>
          <Skeleton variant="rect" height={250} style={{backgroundColor: "#f4f4f4", border:"none"}} className="profile-about bg-light p-2" animation="wave" />
          <Skeleton variant="rect" height={250} style={{backgroundColor: "#f4f4f4", border:"none"}} className="profile-exp bg-white p-2" animation="wave"/>
          <Skeleton variant="rect" height={250} style={{backgroundColor: "#f4f4f4", border:"none"}} className="profile-edu bg-light p-2" animation="wave"/>
          </div>
        </>
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth?.isAuthenticated && auth?.user?._id === profile?.user?._id ?  (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          ) : null}

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} user={profile?.user} />
            <ProfileAbout profile={profile} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />

            {/* <!-- Github --> */}
            <ProfileRepos profile={profile}/>
          </div>
        </>
      )}
    </>
  );
};


const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById, getAuthUser })(
  Profile
);
