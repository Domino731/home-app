import {combineReducers} from "redux";
import {currentUser} from "./currentUser";
import {username} from "./username";

export default  combineReducers({
    currentUser,
    username
})