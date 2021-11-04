/** reducer with current logged user data */
export const currentUser = (state = [], action) => {
    switch (action.type){
        case "CHANGE_USER":
            return action.currentUser;
        default:
            return state;
    }
}