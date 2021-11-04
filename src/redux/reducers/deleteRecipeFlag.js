/** Reducer with boolean value */
export const deleteRecipeFlag = (state = false, action) => {
    switch (action.type) {
        case "CHANGE_DELETE_RECIPE":
            return action.delete;
        default:
            return state;
    }
}