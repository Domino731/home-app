import { db } from "./fireBase";

/**
 * update document in specific subcollection in firestore
 * @param {*} dataId - id of document that you want to update
 * @param {*} userUID - uid of current logged user
 * @param {*} subcollection - name of subcollection where you want update documenet
 * @param {*} element - new data 
 * @param {*} callback - function that you want call on successfull update
 */
export const updateDataFirestore = async (dataId, userUID, subcollection, element, callback) => {
    return await db.collection(`users/${userUID}/${subcollection}`)
        .doc(`${dataId}`)
        .update(element)
        .then(() => {
            typeof callback === "function" && callback();
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}