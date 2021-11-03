export const deleteRecipeFlag = (state = true, action) => {
    switch (action.type){
        case "CHANGE_DELETE_RECIPE":
            return action.delete
        default:
            return state
    }
   }