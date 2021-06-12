export const currentUser = (state = [], action) => {
    console.log(state)
    switch (action.type){
        case "CHANGE_USER":
            return {currentUser: action.currentUser};

        default:
            return state
    }
}