import "./sass/main.scss"
import HomePage from "./components/homePage/HomePage";
import {MyKitchen} from "./components/myKitchen/MyKitchen";
import {MyRecipes} from "./components/myRecipes/MyRecipes";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from "react-redux";
import {changeUser} from "./redux/actions/currenUser.actions";
import {auth} from "./fireBase/fireBase";
import {useEffect} from "react";
import PrivateRoute from "./components/privateRoute/PrivateRoute";


function App({setUser, setUsername, currentUser, username}) {
    useEffect( () => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [currentUser, username])


    return (
        <Router>
            <PrivateRoute exact path="/" component={HomePage}/>
            <PrivateRoute path="/mykitchen" component={MyKitchen}/>
            <PrivateRoute path="/myrecipes" component={MyRecipes}/>
            {/*<Route path="/login" component={UserForm}/>*/}
            {/*<Route path="/register" component={UserFormRegister}/>*/}
        </Router>
    )
}
const mapStateToProps = state => ({
    currentUser: state.currentUser,
    username: state.username
})
const mapDispatchToProps = dispatch => ({
    setUser: data => dispatch(changeUser(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

