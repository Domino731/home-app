/** reducer with data about recipe */
export const recipeData = (state = null, action) => {
    switch (action.type) {
        case "SET_RECIPE_DATA":
            return action.data;
        default:
            return state;
    }
}