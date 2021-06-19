import "./sass/main.scss"
import HomePage from "./components/homePage/HomePage";
import {MyKitchen} from "./components/myKitchen/MyKitchen";
import {MyRecipes} from "./components/myRecipes/MyRecipes";
import MyRecipesList from "./components/myRecipes/MyRecipesList";
import MyRecipesAddForm from "./components/myRecipes/MyRecipesAddForm";
import MyRecipeSingleRecipe from "./components/myRecipes/MyRecipeSingleRecipe";
import {BrowserRouter as Router} from "react-router-dom";
import {connect} from "react-redux";
import {changeUser} from "./redux/actions/currenUser.actions";
import {auth} from "./fireBase/fireBase";
import {useEffect} from "react";
import PrivateRoute from "./components/privateRoute/PrivateRoute";


function App({setUser, currentUser, username}) {
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [currentUser, username, setUser])


    return (
        <Router>
            <PrivateRoute exact path="/" component={HomePage}/>
            <PrivateRoute exact path="/mykitchen" component={MyKitchen}/>
            <PrivateRoute exact path="/myRecipes" component={MyRecipes}/>
            <PrivateRoute exact path="/myRecipes/:type" component={MyRecipesList}/>
            <PrivateRoute exact path="/myRecipes/:type/add" component={MyRecipesAddForm}/>
            <PrivateRoute exact path="/myRecipe/:id" component={MyRecipeSingleRecipe}/>
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

