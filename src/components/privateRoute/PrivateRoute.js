
import { Route } from "react-router-dom"
import { connect } from "react-redux";
import UserForm from "../userForm/UserForm";

/**
 * Private route to which only logged-in users have access. If you want to create private router pass there a component
 * @param currentUser - REDUX STATE - data about current logged user, needed to check if user is logged-in
 * @param component - Component - component that you want to pass into private route
 */
const PrivateRoute = ({ currentUser, component: Component, ...rest }) => {
    return <Route
        {...rest}
        render={props => {
            // user isnt logged -> redirect to login form
            if (currentUser === null) {
                return <UserForm />
            }

            // user is logged -> rendered passed component
            else {
                return <Component {...props} />
            }
        }}
    >
    </Route>
}

// REDUX
const mapStateToProps = state => ({
    currentUser: state.currentUser,
});
export default connect(mapStateToProps)(PrivateRoute)
