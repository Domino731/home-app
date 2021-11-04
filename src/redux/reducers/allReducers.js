import {combineReducers} from "redux";
import {currentUser} from "./currentUser";
import {products} from "./firebaseData";
import {recipes} from "./firebaseData";
import {toDo} from "./firebaseData";
import { recipeData } from "./recipeData";
import { recipeStyles } from "./recipeStyle";
import { deleteRecipeFlag } from "./deleteRecipeFlag";
/** all REDUX reducers */
export default combineReducers({
    currentUser,
    products,
    recipes,
    toDo,
    recipeData,
    recipeStyles,
    deleteRecipeFlag
});