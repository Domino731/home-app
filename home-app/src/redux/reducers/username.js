export const username = (state = "", action) => {
    switch (action.type){
        case "CHANGE_USERNAME":
            const username = action.displayName
            return username
        //{currentUser: action.currentUser};

        default:
            return state
    }
}