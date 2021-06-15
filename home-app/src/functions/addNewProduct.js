import {db} from "../fireBase/fireBase";

export const addNewElement = (username, type, element) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
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