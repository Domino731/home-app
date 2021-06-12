import {db} from "../fireBase/fireBase";
import {createUsername} from "./createUsername";

export const createUserDatabase = (userName) => {
    db.collection('products')
        .add({
            userName: createUsername(userName)
    })
    db.collection('recipes')
        .add({
            userName: createUsername(userName)
        })
}