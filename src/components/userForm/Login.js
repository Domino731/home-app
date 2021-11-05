//component responsible for user login, is used in UserForm component
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../fireBase/fireBase";

// props //
// changeForm --> changing form to register
export const Login = () => {

    // state with date needed to loggin user
    const [data, setData] = useState({ email: "", password: "" });

    const [invalid, setInvalid] = useState({ email: false, password: false});

    // //state with user data
    // const [data, setData] = useState({email: "", password: ""})

    // //state with error if user gives wrong data
    // const [error, setError] = useState("")

    // //function that changing form to register
    // const handleChangeForm = () => {
    //     if (typeof changeForm) {
    //         return changeForm()
    //     }
    // }

    // //function that changing user's data
    // const handleInputChange = (e) => {
    //     const {name, value} = e.target;
    //     setError("")
    //     setData((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    //function that is responsible for login user
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     auth().signInWithEmailAndPassword(data.email, data.password)
    //         .then(() => {
    //             // Signed in
    //             setTimeout(() => {
    //                 history.push("/")
    //             }, 5000)

    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorCode, errorMessage)
    //             setError("Niepoprawny login lub hasło")
    //         });
    // }

    //history
    let history = useHistory();

    const handleChangeData = (e) => {
        const {name, value} = e.target;
        return setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return <main className="auth">
        <h1 className="auth__title">Zaloguj</h1>
        <form className="auth__form">
            <label className={`auth__label ${invalid.email ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                Podaj e-mail
                <i className="fas fa-at" />
                <input 
                name='email' 
                value={data.email} 
                className="auth__input" 
                onChange={handleChangeData}
                 required/>
                <span>E-mail</span>
            </label>
            <label className={`auth__label ${invalid.password ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                Podaj hasło
                <i className="fas fa-lock"/>
                <input name='password' 
                value={data.password} 
                className="auth__input" 
                onChange={handleChangeData}
                 required/>
                <span>Hasło</span>
            </label>
            <div className="auth__error">Nieprawidłowy e-mail</div>
            <div className="auth__error">Nieprawidłowe hasło</div>
            <button className="auth__btn">Zaloguj się</button>
        </form>
    </main>

}

