import {db} from "./fireBase";

/**
 * delete specific document from firestore database (from specific nested collection in 'user' collection)
 * @param {*} dataId - id of document that you want to delete
 * @param {*} userUID - uid of current logged user 
 * @param {'ToDo' | 'products' | 'recipes'} collection - name of collection from where you want to delete document 
 */
export const deleteDataFirestore = async (dataId, userUID, collection) => {
    return await db.collection(`users/${userUID}/${collection}`)
    .doc(`${dataId}`)
    .delete()
    .catch((err)=> {
        console.error(err);
    });
}