export const setProducts = (data) => ({
    type: "GET_PRODUCTS",
    products: data
})
export const setRecipes = (data) => ({
    type: "GET_RECIPES",
    recipe: data
})
export const setToDos = (data) => ({
    type: "GET_TODO",
    todo: data
})