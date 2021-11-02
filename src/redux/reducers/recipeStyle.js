export const recipeStyles = (state = null, action) => {

    switch (action.type) {
        case "SET_RECIPE_STYLES":
            const data = action.data
            return data
        default:
            return state
    }
}