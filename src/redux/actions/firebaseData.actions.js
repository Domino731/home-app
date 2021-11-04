/**
 * set products state in REDUX
 * @param {*} data - data about products 
 */
export const setProducts = (data) => ({
    type: "GET_PRODUCTS",
    products: data
});

/**
 * set recipes state in REDUX
 * @param {*} data - data about recipes
 */
export const setRecipes = (data) => ({
    type: "GET_RECIPES",
    recipe: data
});

/**
 * set ToDo state in REDUX
 * @param {*} data - data about tasks 
 */
export const setToDos = (data) => {
    return ({
        type: "GET_TODO",
        todo: data.sort((a,b) => a.added - b.added)
    });
}