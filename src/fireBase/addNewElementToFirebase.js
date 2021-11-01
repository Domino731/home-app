
import {db} from "./fireBase";
import { auth } from "./fireBase";
// params //
// username --> to the function know for which user to push a new element
// type --> type of element (ToDO, recipes, products)
// element --> new element
//adds a new item to the firestore
export const addNewElement = async (userUid, category, element) => {
            db.collection("users").doc(`${userUid}`).collection(`${category}`)
                .add(element)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
}