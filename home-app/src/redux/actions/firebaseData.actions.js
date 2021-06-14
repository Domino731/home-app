export const setProducts = (TEXT) => ({
    type: "GET_PRODUCTS",
    products: TEXT
})
export const setRecipes = (TEXT) => ({
    type: "GET_RECIPES",
    recipe: TEXT
})
export const setToDo = (TEXT) => ({
    type: "GET_TODO",
    todo: TEXT
})