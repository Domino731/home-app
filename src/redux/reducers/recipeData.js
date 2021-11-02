export const recipeData = (state = null, action) => {

    switch (action.type) {
        case "SET_RECIPE_DATA":
            const data = action.data
            return data
        default:
            return state
    }
}