//adds a new item to the firestore
import {db} from "./fireBase";

// params //
// username --> to the function know for which user to push a new element
// type --> type of element (ToDO, recipes, products)
// element --> new element
export const addNewElement = (username, type, element) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
            //getting the user id so as to know where to push new element
            const id = querySnapshot.docs.map(doc => doc.id);
            db.collection("users").doc(`${id[0]}`).collection(`${type}`)
                .add(
                element
            )
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        })

}