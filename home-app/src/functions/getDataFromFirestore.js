import {db} from "../fireBase/fireBase";

export const getDataFromFirestore = (item, username, set,) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
            const id = querySnapshot.docs.map(doc =>
                db.collection(`users/${doc.id}/${item}`)
                    .onSnapshot(querySnapshot => {
                        const data = querySnapshot.docs.map(doc => ({
                            ...doc.data(),
                            id: doc.id
                        }));
                        set(data)
                    })
            );
        })
}
export const getUsers = (set) => {
    db.collection("users")
        .onSnapshot(querySnapshot => {
            const arr = []
            querySnapshot.docs.map(doc => arr.push(doc.data().userName));
             set(arr)
        })
}

