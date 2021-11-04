//reducers with firebase data - products, recipes and tasks
export const products = (state = null, action) => {

 switch (action.type){
     case "GET_PRODUCTS":
         return action.products;
     default:
         return state;
 }
}
export const recipes = (state = null, action) => {
    switch (action.type){
        case "GET_RECIPES":
            return action.recipe;
        default:
            return state;
    }
}
export const toDo = (state = null, action) => {
    switch (action.type){
        case "GET_TODO":
            return action.todo;
        default:
            return state;
    }
}

