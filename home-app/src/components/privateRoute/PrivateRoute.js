import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import UserForm from "../userForm/UserForm";
import {getDataFromFirestore} from "../../functions/getDataFromFirestore";
import {useEffect, useState} from "react";
import {db} from "../../fireBase/fireBase";
import {addProducts} from "../../redux/actions/firebaseData.actions";

const PrivateRoute = ({currentUser, setProducts, component: Component, ...rest}) => {
    const [s] = useState(db.collection("users"))
    useEffect(() => {
        if (currentUser !== null) {
            getDataFromFirestore("recipes",currentUser.displayName, setProducts)
        }
    }, [s, currentUser, setProducts])
    return (
        <Route
            {...rest}
            render={props => {
                // if(currentUser.currentUser === null){
                //    return  <Redirect to="/login"/>
                // }
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
    currentUser: state.currentUser,
    products: state.userProducts,
})
const mapDispatchToProps = dispatch => ({
    setProducts: data => dispatch(addProducts(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
