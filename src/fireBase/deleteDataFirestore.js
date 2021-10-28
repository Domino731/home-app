// deleting data from firestore
import {db} from "./fireBase";

// params //
// dataId --> to delete specific element
// username --> to know where delete
// category --> to know in which category delete
export const deleteDataFirestore = (dataId, userUID, category) => {
    db.collection(`users/${userUID}/${category}`)
    .doc(`${dataId}`)
    .delete()
    .then(()=> {
        console.log('Data deleted')
    })
    .catch((err)=> {
        console.error(err);
    })
}