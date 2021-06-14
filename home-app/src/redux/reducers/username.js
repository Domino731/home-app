export const username = (state = null, action) => {
    console.log(state)
    switch (action.type){
        case "CHANGE_USERNAME":
            return action.username
        default:
            return state
    }
}
