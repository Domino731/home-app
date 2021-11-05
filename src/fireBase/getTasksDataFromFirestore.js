
import { db } from "./fireBase";
/**
 * fetch tasks data from firestore ('ToDo' subcollection)
 * @param {*} userUid - current logged user uid
 * @param {*} saveData - that function will save incomming data
 */
export const getTasksDataFromFirestore = (userUid, saveData) => {
    return db.collection(`users/${userUid}/ToDo`)
        .onSnapshot(querySnapshot => {
            const data = [];
             querySnapshot.docs.map(doc => {
                if (doc.data().added) {
                    return data.push({
                        ...doc.data(),
                        id: doc.id
                    });
                }
            });
            return saveData(data);
        });
}