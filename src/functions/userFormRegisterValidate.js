//function that sets errors based on code
// params //
// code --> state is set by this code
// msg --> displaying msg and code in console
// set --> state to set
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

