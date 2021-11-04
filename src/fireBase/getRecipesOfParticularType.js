import { db } from "./fireBase";

/**
 * fetch all recipes of specific type
 *  @param {*} type - name of type 
 * @param {*} userUid - current logged user uid
 * @param {*} saveData - that functiom will save incomming data 
 */
export const getRecipesOfParticularType = (type, userUid, saveData) => {
    return db.collection(`users/${userUid}/recipes`)
        .onSnapshot(querySnapshot => {
            const data = [];
            querySnapshot.docs.map(doc => {
                if (doc.data().type === type) {
                    const recipe = {
                        ...doc.data(),
                        id: doc.id
                    }
                    data.push(recipe);
                }
            });
            saveData(data);
        });
}