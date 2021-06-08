export const currentUser = (state = [], action) => {
    switch (action.type){
        case "CHANGE_USER":
            return {currentUser: action.currentUser};

        default:
            return state
    }
}