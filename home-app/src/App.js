import "./sass/main.scss"
import HomePage from "./components/homePage/HomePage";
import {UserFormRegister} from "./components/userForm/UserFormRegister";
import {UserFormLogin} from "./components/userForm/UserFormLogin";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from "react-redux";
import {changeUser} from "./redux/actions/currenUser.actions";
import {auth} from "./fireBase/fireBase";
import {useEffect} from "react";
import PrivateRoute from "./components/privateRoute/PrivateRoute";


function App({change}) {
    useEffect(() => {
        auth().onAuthStateChanged(user =>{
            if( user ){
                console.log(user)
                 change(user)
            }
            else{
                change(null)
            }
        })
    }, [])
    return (
        <Router>
            <PrivateRoute exact path="/" component={HomePage}/>
            <Route path="/register" component={UserFormRegister}/>
            <Route path="/login" component={UserFormLogin}/>
        </Router>
    )
}

const mapDispatchToProps = dispatch => ({
    change: data => dispatch(changeUser(data))
})
export default connect(null, mapDispatchToProps)(App);
