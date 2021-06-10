import "./sass/main.scss"
import HomePage from "./components/homePage/HomePage";
import {UserFormRegister} from "./components/userForm/UserFormRegister";
import {MyKitchen} from "./components/myKitchen/MyKitchen";
import {MyRecipes} from "./components/myRecipes/MyRecipes";
import UserForm from "./components/userForm/UserForm";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from "react-redux";
import {changeUser} from "./redux/actions/currenUser.actions";
import {auth} from "./fireBase/fireBase";
import {useEffect} from "react";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

const XS = () => {
    return <h1>asd</h1>
}

function App({change}) {
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                change(user)
            } else {
                change(null)
            }
        })
    }, [])
    return (
        <Router>
            <PrivateRoute exact path="/" component={HomePage}/>
            <PrivateRoute path="/mykitchen" component={MyKitchen}/>
            <PrivateRoute path="/myrecipes" component={MyRecipes}/>
            <Route path="/login" component={UserForm}/>
            <Route path="/register" component={UserFormRegister}/>
        </Router>
    )
}

const mapDispatchToProps = dispatch => ({
    change: data => dispatch(changeUser(data))
})
export default connect(null, mapDispatchToProps)(App);
