//getting single item form firestore
import {db} from "../fireBase/fireBase";
// params //
// ctg --> category from which you want get specific element
// username --> to know from which user get element
// id --> to get the element with specific id
export const getSingleItemFromFirestore = (ctg, username, Id) => {
    db.collection("users")
        .where(`userName`, `==`, `${username}`)
        .onSnapshot(querySnapshot => {
            querySnapshot.docs.map(doc =>
                db.collection(`users/${doc.id}/${ctg}`)
                    .where("id", "==", Id)
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