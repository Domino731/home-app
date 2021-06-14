import {combineReducers} from "redux";
import {currentUser} from "./currentUser";
import {username} from "./username";
//import {products} from "./products";
import {products} from "./firebaseData";

export default  combineReducers({
    currentUser,
    username,
    products
})