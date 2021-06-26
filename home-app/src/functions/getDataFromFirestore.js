import {db} from "../fireBase/fireBase";

// getting data form specific category
// params //
// ctg --> category form which you want get data
// username --> to know form which users get data
// set --> sets state with data
export const getDataFromFirestore = (ctg, username, set) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
             querySnapshot.docs.map(doc =>
                db.collection(`users/${doc.id}/${ctg}`)
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
// getting the users form firestore
// params //
// set --> sets the state with users array
export const getUsers = (set) => {
    db.collection("users")
        .onSnapshot(querySnapshot => {
            const arr = []
            querySnapshot.docs.map(doc => arr.push(doc.data().userName));
            set(arr)
        })
}

