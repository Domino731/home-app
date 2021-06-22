import {db} from "../fireBase/fireBase";

export const getSingleItemFromFirestore = (item, username, ID) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
            const id = querySnapshot.docs.map(doc =>
                db.collection(`users/${doc.id}/${item}`)
                    .where("id", "==", ID)
                    .onSnapshot(querySnapshot => {
                        const data = querySnapshot.docs.map(doc => ({
                            ...doc.data(),
                            id: doc.id
                        }));
                        console.log(data)
                    })
            );
        })
}