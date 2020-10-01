import React, { useEffect } from "react";
import {connect} from 'react-redux'
import {getRepos} from '../../actions/profile'
const ProfileRepos = ({repos, getRepos,profile}) => {
    useEffect(() => {
        getRepos(profile.githubusername)
    }, [profile.githubusername])
  return (
    <>
      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github"></i> Github Repos
        </h2>
        {repos?.map((repo) => {
          return (
            <>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">
                      Stars: {repo.stargazers_count}
                    </li>
                    <li className="badge badge-dark">
                      Watchers: {repo.watchers_count}
                    </li>
                    <li className="badge badge-light">
                      Forks: {repo.forks_count}
                    </li>
                  </ul>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
    repos: state.profile.repos
})
export default connect(mapStateToProps, {getRepos})(ProfileRepos);
