import {combineReducers} from "redux";
import {currentUser} from "./currentUser";
import {products} from "./firebaseData";
import {recipes} from "./firebaseData";
import {toDo} from "./firebaseData";
import {username} from "./username";

export default  combineReducers({
    currentUser,
    username,
    products,
    recipes,
    toDo
})