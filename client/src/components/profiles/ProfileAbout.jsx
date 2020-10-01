import React from 'react'

const ProfileAbout = ({profile}) => {
    return (
        <>
             <div className="profile-about bg-light p-2">
              <h2 className="text-primary">{profile?.user?.name}'s Bio</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                doloremque nesciunt, repellendus nostrum deleniti recusandae
                nobis neque modi perspiciatis similique?
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
        </>
    )
}

export default ProfileAbout
