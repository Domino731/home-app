import { db } from "./fireBase";

/**
 * fetch data from specific subcollection in user's account in firestore
 * @param {*} collection - name of subcollection 
 * @param {*} userUid - current logged user uid
 * @param {*} saveData - that function will save incomming data
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

