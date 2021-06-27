//function that updates documents in firestore

import {db} from "./fireBase";

// params //
// dataId --> to know which element update
// username --> to know which user want to update
// ctg --> to know category
// element --> new element
// fnc --> function that you want to call

export const updateDataFirestore = async (dataId, username, ctg, element, fnc) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
             querySnapshot.docs.map(doc =>
                db.collection(`users/${doc.id}/${ctg}`)
                    .doc(`${dataId}`).update(element)
                .then(() => {
                    console.log("Document successfully updated!");
                    fnc()
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                })
            );
        })
}