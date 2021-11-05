import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
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
        .then(doc => {
            // check if document exist
            if (doc.exists) {
                const data = doc.data()
                data.id = doc.id
                return saveData(data)
            }
            // if documents doesnt exist then redirect user to page with all recipes tyles
            else {
                window.location.replace(`/myRecipes`)
            }

        })
        .catch(err => {
            console.log(err)
            return  window.location.replace(`/myRecipes`)
        })
}