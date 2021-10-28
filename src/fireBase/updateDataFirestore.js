//function that updates documents in firestore

import { db } from "./fireBase";

// params //
// dataId --> to know which element update
// username --> to know which user want to update
// ctg --> to know category
// element --> new element
// fnc --> function that you want to call

export const updateDataFirestore = async (dataId, userUID, category, element, callback) => {
    db.collection(`users/${userUID}/${category}`)
        .doc(`${dataId}`).update(element)
        .then(() => {
            typeof callback === "function" && callback();
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        })
}