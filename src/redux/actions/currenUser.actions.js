/** change currentUser state in REDUX 
 * @param data - data about user
*/
export const changeUser = data => ({
    type: "CHANGE_USER",
    currentUser: data
});