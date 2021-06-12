import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import UserForm from "../userForm/UserForm";

const PrivateRoute = ({currentUser, component: Component, ...rest}) => {
    console.log( typeof currentUser.currentUser)
    return(
        <Route
            {...rest}
            render={props => {
               // if(currentUser.currentUser === null){
               //    return  <Redirect to="/login"/>
               // }
                if(currentUser.currentUser === null){
                   return <UserForm/>
                }
               else if(currentUser.currentUser === undefined){
                   return "ładuję ..."
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
export default connect(mapStateToProps)(PrivateRoute)