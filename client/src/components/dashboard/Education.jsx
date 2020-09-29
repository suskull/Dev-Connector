import React from 'react'
import Moment from 'react-moment';
import {connect} from 'react-redux'
import {deleteEducation} from '../../actions/profile'
const Education = ({education,deleteEducation}) => {

    const educations = education?.map(e => {
        return (
            <>
                <tr key={e.id}>
                    <td>{e.school}</td>
                    <td className="hide-sm">{e.degree}</td>
                    <td><Moment format='YYYY/MM/DD'>{e.from}</Moment> - {
                        e.to ? (<Moment format='YYYY/MM/DD'>{e.to}</Moment>) : ('Now')
                    }
                    </td> 
                    <td></td>
                    <button className="btn btn-danger" onClick={() => deleteEducation(e.id)}>Delete</button>
                </tr>
            </>
        )
    })
    return (
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>

                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </>
    )
}

const mapStateToProps = state => ({
    education : state.profile.profile.education
})

export default connect(mapStateToProps,{deleteEducation})(Education)
