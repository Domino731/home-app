export const createUsername = (email) => {
    const user = email;
    const position = user.indexOf("@") - 1 ;
    let username = "";
    for(let i = 0; i <= position; i++){
        username = username + email.charAt(i)
    }
    return username
}
