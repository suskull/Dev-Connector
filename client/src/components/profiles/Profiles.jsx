import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const Profiles = ({ profiles, getProfiles, isLoading }) => {
  useEffect(() => {
    //   setTimeout(() => {
    //     getProfiles();
    //   }, 2000);
    getProfiles();
  }, []);

  console.log("hahaha", profiles);

  const profilesRender = profiles?.map(profile => {
      return (
          <>
            <div class="profile bg-light">
              <img
                class="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <div>
                <h2>{profile.user.name}</h2>
                <p>{profile.bio}</p>
                <p>{profile.location}</p>
                <a href="profile.html" class="btn btn-primary">
                  View Profile
                </a>
              </div>

              <ul>
                {profile?.skills?.map((e,index) => (
                     <li class="text-primary" key={index}>
                         <i class="fas fa-check"></i>{e}
                   </li>
                ))}
              </ul>
            </div>
          </>
      )
  })

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
        
          <h1 class="large text-primary">Developers</h1>
          <p class="lead">
            <i class="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div class="profiles">
          {profilesRender}
            <div class="profile bg-light">
              <img
                class="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <div>
                <h2>John Doe</h2>
                <p>Developer at Microsoft</p>
                <p>Seattle, WA</p>
                <a href="profile.html" class="btn btn-primary">
                  View Profile
                </a>
              </div>

              <ul>
                <li class="text-primary">
                  <i class="fas fa-check"></i> HTML
                </li>
                <li class="text-primary">
                  <i class="fas fa-check"></i> CSS
                </li>
                <li class="text-primary">
                  <i class="fas fa-check"></i> JavaScript
                </li>
              </ul>
            </div>
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
