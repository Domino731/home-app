/**
 * change deleteRecipeFlag state in REDUX
 * @param {boolean} boolean - boolean value
 */
export const changeDeleteRecipeFlagRDX = boolean => ({
    type: "CHANGE_DELETE_RECIPE",
    delete: boolean
})