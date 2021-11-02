import {db} from "./fireBase";
// getting data form specific category
// params //
// ctg --> category form which you want get data
// username --> to know form which users get data
// set --> sets state with data
export const getDataFromFirestore = (category, userUid, saveData) => {

    return db.collection(`users/${userUid}/${category}`)
    .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        saveData(data)
    });
}

