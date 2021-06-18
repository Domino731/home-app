import {auth} from "./fireBase";
import {createUserDatabase} from "../functions/createUserDatabase";

export const registerDB = (data) =>
    {
        auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                // Signed in
                createUserDatabase()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
               console.log(errorCode, errorMessage)
            });
    }
