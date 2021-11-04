import { db } from "./fireBase"
/**
 * fetch data about specific recipe from firestore database
 * @param {string} userUid - id of current logged user
 * @param {string} recipeId - if of recipe that you want to fetch
 * @param {function} saveData - that function will save incomming data
 */
export const getRecipeData = (userUid, recipeId, saveData) => {
    return db.collection('users')
    .doc(userUid)
    .collection('recipes')
    .doc(recipeId)
    .get()
    .then( doc => {
         const data = doc.data()
         data.id = doc.id
         return saveData(data)
    })
    .catch(err => console.log(err))
}