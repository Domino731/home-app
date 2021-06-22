import {Route} from "react-router-dom"
import {connect} from "react-redux";
import UserForm from "../userForm/UserForm";
import {getDataFromFirestore} from "../../functions/getDataFromFirestore";
import {useEffect, useState} from "react";
import {db} from "../../fireBase/fireBase";
import {setProducts} from "../../redux/actions/firebaseData.actions";
import {setRecipes} from "../../redux/actions/firebaseData.actions";
import {setToDos} from "../../redux/actions/firebaseData.actions";
import {Loading} from "../loading/Loading";

const PrivateRoute = ({currentUser, setProducts,setRecipes, setToDos, component: Component, ...rest}) => {
    useEffect(() => {
        if (currentUser !== null) {
            getDataFromFirestore("recipes",currentUser.displayName, setRecipes)
            getDataFromFirestore("products",currentUser.displayName, setProducts)
            getDataFromFirestore("ToDo",currentUser.displayName, setToDos)
        }
        console.log("changed")
    }, [ currentUser, setProducts,setRecipes, setToDos])
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
