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
        <Spinner />
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
