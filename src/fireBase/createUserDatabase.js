import { db } from "./fireBase";
const today = new Date().toLocaleDateString()

/**
 * create initial user data in firestore database in 'users' collection
 * @param {*} uid - uid of new created user
 */
export const createUserDatabase = (uid) => {
    addSubcollection(uid, "recipes");
    addSubcollection(uid, "ToDo");
    addSubcollection(uid, "products");
}

/**
 * create new subcollection in 'users' collection 
 * @param {*} id - id of doc where you want to nest new collection
 * @param {*} name - name of new collection
 */
const addSubcollection = async (id, name) => {
    return await db.collection("users")
        .doc(`${id}`)
        .collection(`${name}`)
        .doc()
        .set({
            firstDoc: today
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}
