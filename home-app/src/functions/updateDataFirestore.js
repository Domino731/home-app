import {db} from "../fireBase/fireBase";

export const updateDataFirestore = async (DataId, username, item, element, fnc) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
            const id = querySnapshot.docs.map(doc =>
                db.collection(`users/${doc.id}/${item}`)
                    .doc(`${DataId}`).update(element)
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