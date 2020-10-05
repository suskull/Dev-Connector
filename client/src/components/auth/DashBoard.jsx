import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteAccount, getLoginedUserProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner.jsx'
import DashBoardAction from '../dashboard/DashBoardAction'
import Experience from '../dashboard/Experience'
import Education from '../dashboard/Education'
const DashBoard = ({getLoginedUserProfile, auth : {user}, profile,deleteAccount}) => {

     useEffect(() => {
        getLoginedUserProfile()
    }, [])

        

    return (
        <>
            {profile?.profile === null ? <Spinner /> 
                :<>
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                    <i className="fas fa-user">Welcome {user?.name}</i>
                    </p>
                    {
                        !profile?.profile
                        ?<>
                            <p>You have not yet setup a profile, please add some info</p>
                            <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                        </> 
                        : <>
                            <DashBoardAction />
                            <Experience experience={profile.profile.experience}/>
                            <Education education={profile.profile.education}/>
                            <div className="my-2">
                            <button className="btn btn-danger" onClick={()=>deleteAccount()} >
                                <i className="fas fa-user-minus">Delete My Account</i>
                            </button>
                            </div>
                         </>
                    }
                </>
                
            }
            
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {getLoginedUserProfile,deleteAccount})(DashBoard)
