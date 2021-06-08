






import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux";

const PrivateRoute = ({currentUser, component: Component, ...rest}) => {
    console.log(JSON.stringify(currentUser).length)
    return(
        <Route
            {...rest}
            render={props => {
                return currentUser  ? <Component {...props}/> : <Redirect to="/login"/>
            }}
        >

        </Route>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps)(PrivateRoute)