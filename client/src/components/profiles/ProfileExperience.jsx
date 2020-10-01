import React from 'react'
import Moment from "react-moment";

const ProfileExperience = ({profile}) => {
    return (
        <>
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
        </>
    )
}

export default ProfileExperience
