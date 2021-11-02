import { db } from "./fireBase"
/**
 * fetch data about specific recipe styles (svg icon and color) from firestore database - collection 'recipes rendering'
 * @param {string} recipeType - type of recipe - cake, dinner...
 * @param {function} saveData - that function will save incomming data
 */
 export const getRecipeStyles = (recipeType, saveData) => {
    return db.collection('recipesRendering').where("path", "==", recipeType)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log()
            const data = {
                color: doc.data().color,
                icon: doc.data().icon
            }
            saveData(data)
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}