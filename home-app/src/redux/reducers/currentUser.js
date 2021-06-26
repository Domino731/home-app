export const currentUser = (state = [], action) => {
    switch (action.type){
        case "CHANGE_USER":
            const currentUser = action.currentUser
            return currentUser

        default:
            return state
    }
}