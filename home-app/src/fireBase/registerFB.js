import {auth} from "./fireBase";

export const registerDB = (data) =>
    {
        auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
