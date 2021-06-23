export const userFormRegisterValidate = (code, msg, set) => {
    console.log(msg, code)
    if (code === "auth/invalid-email") {
        set(prev => ({...prev, email: "*Podany e-mail jest nieprawidłowy"}))
    }
    if (code === "auth/email-already-in-use") {
        set(prev => ({...prev, email: "*Ten e-mail jest już przypisany do konta"}))
    }
    if( code === "auth/weak-password"){
        set(prev => ({...prev, password: "*Hasło powinno zawierać 6 znaków"}))

    }
     console.log(code, msg)
}

// else if(data.password !== data.passwordRepeat) {
//     setInvalid(prev => ({...prev, password: "*Hasła nie są takie same"}))
// }
// else if(data.password.length < 6){
//     setInvalid(prev => ({...prev, password: "*Hasło powinno zawierać 6 znaków"}))
// }
// else if(data.email.length < 5){
//     setInvalid(prev => ({...prev, email: "*Podany e-mail jest nieprawidłowy"}))
// }
// else if(users.includes(data.userName)){
//     setInvalid(prev => ({...prev, userName: "*Nazwa użytkownika jest zajęta"}))
// }
// else if(data.userName.length < 4){
//     setInvalid(prev => ({...prev, userName: "*Nazwa użytkownika powinna zawierać conajmniej 4 znaki"}))
// }