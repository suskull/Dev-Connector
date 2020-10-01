import React from 'react'
import Moment from "react-moment";

const ProfileEducation = ({profile}) => {
    return (
        <>
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
        </>
    )
}

export default ProfileEducation
