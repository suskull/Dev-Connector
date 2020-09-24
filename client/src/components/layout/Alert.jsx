import React from 'react'
import {connect} from 'react-redux'
import { removeAlert } from '../../actions/alert'
const Alert = ({alerts,removeAlert}) => {


    return (
        <>
         {alerts?.map(alert => {
             const id = alert.id;
             return (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    <p>{alert.msg}</p>
                    <p style={{display:"none"}}>
                        {setTimeout(() => {
                            removeAlert(id)
                        }, 2000)}
                    </p>
                   
                </div>
             )
         } )}
        </>
      
    )
}


const mapStateToProps = state => ({
    alerts: state.alert
})

const mapDispatchToProps = dispatch =>({
    removeAlert : id => dispatch(removeAlert(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(Alert)
