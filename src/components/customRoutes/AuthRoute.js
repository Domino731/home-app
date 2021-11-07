import { connect } from "react-redux"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { Route } from "react-router-dom/cjs/react-router-dom.min"
/**
 * Router for auth component -> login, register, password recovery
 * @param {*} currentUser - REDUX STATE - data about current logged user,
 *  needed to redirect user to PrivateRoute if he is logged in and if he is not logged in then redirect him to component auth
 */
const AuthRoute = ({ currentUser, component: Component, ...rest }) => {
    return <Route
        {...rest}
        render={props => {
            // user isnt logged -> redirect to login form
            if (currentUser === null) {
                return <Component {...props} />
            }

            // user is logged then redirect him to home page (HomePage component)
            else {
                return <Redirect to='/' />
            }
        }}
    >
    </Route>
}
// REDUX
const mapStateToProps = state => ({
    currentUser: state.currentUser,
});
export default connect(mapStateToProps)(AuthRoute)