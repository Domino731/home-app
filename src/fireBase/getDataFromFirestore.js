import { db } from "./fireBase";
// getting data form specific category
// params //
// ctg --> category form which you want get data
// username --> to know form which users get data
// set --> sets state with data
/**
 * fetch data from specific subcollection in user's account in firestore
 * @param {*} collection - name of subcollection 
 * @param {*} userUid - current logged user uid
 * @param {*} saveData - that function will save incomming data
 * @returns 
 */
export const getDataFromFirestore = (collection, userUid, saveData) => {
    return db.collection(`users/${userUid}/${collection}`)
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            return saveData(data);
        });
}

