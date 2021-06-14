export const products = (state = [], action) => {
    console.log(state)
    switch (action.type) {
        case "CHANGE_PRODUCTS":

            return {userProducts: action.products}
        //{currentUser: action.currentUser};

        default:
            return state
    }
}