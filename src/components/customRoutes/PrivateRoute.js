
import { Route } from "react-router-dom"
import { connect } from "react-redux";
import { useEffect } from "react";
import { setRecipes, setToDos } from "../../redux/actions/firebaseData.actions";
import { auth } from "../../fireBase/fireBase";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
/**
 * Private route to which only logged-in users have access. If you want to create private router pass there a component
 * @param currentUser - REDUX STATE - data about current logged user, needed to check if user is logged-in
 * @param component - Component - component that you want to pass into private route
 */
const PrivateRoute = ({ currentUser, setRecipes, setProducts, setToDos, component: Component, ...rest }) => {

    // clear redux statewhen the user has logged out
    useEffect(() => {
        return auth().onAuthStateChanged(user => {
            if (!user) {
                setRecipes(null);
                setProducts(null);
                setToDos(null);
            }
        });
    }, []);

    return <Route
        {...rest}
        render={props => {
            // user isnt logged -> redirect to login form
            if (currentUser === null) {
                return <Redirect to='/login' />
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
const mapDispatchToProps = dispatch => ({
    setRecipes: data => dispatch(setRecipes(data)),
    setProducts: data => dispatch(setRecipes(data)),
    setToDos: data => dispatch(setToDos(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
