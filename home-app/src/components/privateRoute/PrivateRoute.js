import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import UserForm from "../userForm/UserForm";
import {getDataFromFirestore} from "../../functions/getDataFromFirestore";
import {useEffect, useState} from "react";
import {db} from "../../fireBase/fireBase";
import {setProducts} from "../../redux/actions/firebaseData.actions";
import {setRecipes} from "../../redux/actions/firebaseData.actions";
import {setToDo} from "../../redux/actions/firebaseData.actions";
import {setUsername} from "../../redux/actions/username.actions";

const PrivateRoute = ({currentUser, setProducts,setRecipes, setUsername, setToDo, component: Component, ...rest}) => {
    const [s] = useState(db.collection("users"))
    useEffect(() => {
        if (currentUser !== null) {
            getDataFromFirestore("recipes",currentUser.displayName, setRecipes)
            getDataFromFirestore("products",currentUser.displayName, setProducts)
            getDataFromFirestore("ToDo",currentUser.displayName, setToDo)
            setUsername(currentUser.displayName)
        }
    }, [s, currentUser, setProducts,setRecipes, setToDo, setUsername])
    return (
        <Route
            {...rest}
            render={props => {
                if (currentUser === null) {
                    return <UserForm/>
                } else if (currentUser === undefined) {
                    return "ładuję ..."
                } else {
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
const mapDispatchToProps = dispatch => ({
    setProducts: data => dispatch(setProducts(data)),
    setRecipes: data => dispatch(setRecipes(data)),
    setToDo: data => dispatch(setToDo(data)),
    setUsername: data => dispatch(setUsername(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
