import "./sass/main.scss"
import {BrowserRouter as Router} from "react-router-dom";
import {connect} from "react-redux";
import {changeUser} from "./redux/actions/currenUser.actions";
import {auth} from "./fireBase/fireBase";
import {useEffect} from "react";
import { HomePage } from "./components/homePage/HomePage";
import MyKitchen from "./components/myKitchen/MyKitchen";
import {MyRecipes} from "./components/myRecipes/MyRecipes";
import MyRecipesList from "./components/myRecipes/MyRecipesList";
import {MyRecipesAddForm}  from "./components/myRecipes/MyRecipesAddForm";
import MyRecipeSingleRecipe from "./components/myRecipes/MyRecipeSingleRecipe";
import PrivateRoute from "./components/customRoutes/PrivateRoute";
import ToDo from "./components/toDo/ToDo";
import { MyRecipeEdit } from "./components/myRecipes/MyRecipeEdit";
import { Login } from "./components/userForm/Login";
import AuthRoute from "./components/customRoutes/AuthRoute";
function App({setUser}) {

    //when component mounted check the user is logged in and set redux state (currentUser state)
    useEffect(() => {
       return auth().onAuthStateChanged(user => user ? setUser(user) : setUser(null) )
    }, []);

    return (
        <Router>
            <AuthRoute  exact path="/login" component={Login}/>
            <PrivateRoute exact path="/" component={HomePage}/>
            <PrivateRoute exact path="/mykitchen" component={MyKitchen}/>
            <PrivateRoute exact path="/myRecipes" component={MyRecipes}/>
            <PrivateRoute exact path="/myRecipes/:type" component={MyRecipesList}/>
            <PrivateRoute exact path="/myRecipes/:type/add" component={MyRecipesAddForm}/>
            <PrivateRoute exact path="/myRecipe/:id" component={MyRecipeSingleRecipe}/>
            <PrivateRoute exact path="/myRecipe/edit/:id" component={MyRecipeEdit}/>
            <PrivateRoute exact path="/tasks" component={ToDo}/>
        </Router>
    )
}


const mapDispatchToProps = dispatch => ({
    setUser: data => dispatch(changeUser(data))
})
export default connect(null, mapDispatchToProps)(App);

