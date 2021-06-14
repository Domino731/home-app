import {db} from "../fireBase/fireBase";

export const getProductsFromFirestore = (username) => {
    console.log(username)
     db.collection("users").where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            console.log(data)
        })

}
