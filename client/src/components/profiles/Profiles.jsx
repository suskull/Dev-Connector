import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = ({ profiles, getProfiles, isLoading }) => {
  useEffect(() => {
        getProfiles();
    // getProfiles();
  }, [profiles.length]);

  console.log("hahaha", profiles);

  return (
    <>
      {profiles.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles"> 
            {profiles?.map(profile =>  <ProfileItem profile={profile} key={profile._id}/> )}
           
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  isLoading: state.profile.isLoading
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
