import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
const PrivateRoute = ({component: Component, isAuthenticated, ...restProps}) => {
    console.log(restProps)
    return (
      <Route {...restProps} render ={(props) => {
          console.log(props)
          return (
              <>
              {isAuthenticated ? <Component /> : <Redirect to='/login'/>}
              </>
          )
      }}/>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(PrivateRoute)
