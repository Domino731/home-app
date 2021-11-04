/** reducer with recipe styles of particular recipe type */
export const recipeStyles = (state = null, action) => {
    switch (action.type) {
        case "SET_RECIPE_STYLES":
            return action.data;
        default:
            return state;
    }
}