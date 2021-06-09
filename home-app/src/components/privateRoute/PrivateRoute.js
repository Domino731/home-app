
import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux";

const PrivateRoute = ({currentUser, component: Component, ...rest}) => {
    console.log(JSON.stringify(currentUser).length)
    console.log(currentUser.currentUser)
    return(
        <Route
            {...rest}
            render={props => {
               if(currentUser.currentUser === null){
                  return  <Redirect to="/login"/>
               }
               else{
                  return <Component {...props}/>
               }
            }}
        >

        </Route>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
})
// return currentUser  ? <Component {...props}/> : <Redirect to="/login"/>
export default connect(mapStateToProps)(PrivateRoute)