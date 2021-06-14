export const products = (state = null, action) => {
    console.log(state)
 switch (action.type){
     case "ADD_TODO":
         return action.products
     default:
         return state
 }
}