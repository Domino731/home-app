import {db} from "../fireBase/fireBase";

export const getFirestoreId = ( username, fnc) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
                    const id = querySnapshot.docs.map(doc => doc.id);
                    console.log(id)
                })

}