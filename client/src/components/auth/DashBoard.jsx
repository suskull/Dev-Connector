import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getLoginedUserProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner.jsx'
import DashBoardAction from '../dashboard/DashBoardAction'
const DashBoard = ({getLoginedUserProfile, auth : {user}, profile}) => {

     useEffect(() => {
        getLoginedUserProfile()
    }, [])

        


    return (
        <>
            {profile?.isLoading ? <Spinner /> 
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
export default connect(mapStateToProps, {getLoginedUserProfile})(DashBoard)
