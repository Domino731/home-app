
import {Route} from "react-router-dom"
import {connect} from "react-redux";
import {getDataFromFirestore} from "../../fireBase/getDataFromFirestore";
import {useEffect} from "react";
import {setProducts} from "../../redux/actions/firebaseData.actions";
import {setRecipes} from "../../redux/actions/firebaseData.actions";
import {setToDos} from "../../redux/actions/firebaseData.actions";
import {Loading} from "../loading/Loading";
import UserForm from "../userForm/UserForm";

// props //
// currentUser --> for checking a user is logged in or not, and getting data from firestore
// set... --> actions from firestore, which are passed to the function getDataFromFirestore
// recipes, products, ToDo --> reducers which store arrays of data, which are passed to the function getDataFromFirestore
// component --> component which you want to render
// rest --> rest props to route
const PrivateRoute = ({currentUser, setProducts, setRecipes, setToDos, component: Component, ...rest}) => {

    //if user is logged in, get data from firestore and push into reducers
    useEffect(() => {
        if (currentUser !== null) {
           // getDataFromFirestore("recipes", currentUser.displayName, setRecipes)
           // getDataFromFirestore("products", currentUser.displayName, setProducts)
            // getDataFromFirestore("ToDo", currentUser.displayName, setToDos)
        }
    }, [currentUser])

    return (
        <Route
            {...rest}
            render={props => {

                if (currentUser === null) {
                    return <UserForm/>
                } else if (currentUser === undefined) {
                    return <Loading/>
                } else {
                    return <Component {...props}/>
                }
            }}
        >

        </Route>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
})

const mapDispatchToProps = dispatch => ({
    setProducts: data => dispatch(setProducts(data)),
    setRecipes: data => dispatch(setRecipes(data)),
    setToDos: data => dispatch(setToDos(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
