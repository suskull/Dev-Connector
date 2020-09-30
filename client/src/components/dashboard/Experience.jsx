import React from 'react'
import Moment from 'react-moment';
import {connect} from 'react-redux'
import {deleteExperience} from '../../actions/profile'
const Experience = ({experience, deleteExperience}) => {
    console.log(experience)
    const experiences = experience?.map(e => {
        
        return (
            <>
                <tr key={e._id}>
                    <td>{e.company}</td>
                    <td className="hide-sm">{e.title}</td>
                    <td><Moment format='YYYY/MM/DD'>{e.from}</Moment> - {
                        e.to ? (<Moment format='YYYY/MM/DD'>{e.to}</Moment>) : ('Now')
                    }
                    </td> 
                    <td>
                    <button className="btn btn-danger" onClick={() =>deleteExperience(e.id)}>Delete</button>
                    </td>
                </tr>
            </>
        )
    })
    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Titles</th>
                        <th className="hide-sm">Years</th>

                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </>
    )
}

const mapStateToProps = state => ({
    experience : state.profile.profile.experience
})

export default connect(mapStateToProps, {deleteExperience})(Experience)
