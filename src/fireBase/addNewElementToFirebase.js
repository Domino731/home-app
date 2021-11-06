
import { db } from "./fireBase";

/**
 * add new element to specific subcollection in firestore
 * @param {*} userUid - uid of current logged user
 * @param {'recipes' | 'ToDo' | 'products'} collection - name of subcollection 
 * @param {*} element - data about new element
 */
export const addNewElement = async (userUid, collection, element) => {
    return await db.collection("users")
        .doc(`${userUid}`)
        .collection(`${collection}`)
        .add(element)
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}