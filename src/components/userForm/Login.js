import { useState } from "react";
import { auth } from "../../fireBase/fireBase";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


/**
 * Component by which user can log into app
 * @returns 
 */
export const Login = () => {

    // state with data needed to loggin user
    const [data, setData] = useState({ email: "", password: "" });

    // invalid states, needed to change color of icon when user passed invalid data
    const [invalid, setInvalid] = useState({ email: false, password: false });

    // text which are displaying when user passed invalid data
    const [errorTxt, setErrorTxt] = useState({ email: "", password: "" });

    /** function that is responsible for login user */
    const handleLogin = (e) => {
        e.preventDefault()

        // try to log the user in
        return auth().signInWithEmailAndPassword(data.email, data.password)

        // set errors
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                //setting invalid state by error code
                // check email
                if (errorCode === 'auth/email-already-in-use') {
                    setErrorTxt('! Ten adres email jest przypisany już do innego konta');
                    setInvalid(prev => ({ ...prev, email: true }));
                }
                else if (errorCode === 'auth/invalid-email') {
                    setErrorTxt('! Podany adres email jest nieprawidłowy');
                    setInvalid(prev => ({ ...prev, email: true }));
                }
                // clear email errors 
                else {
                    setErrorTxt(prev => ({ ...prev, email: '' }));
                    setInvalid(prev => ({ ...prev, email: false }));
                }


                // check password
                if (errorCode === 'auth/wrong-password') {
                    setErrorTxt('! Podany adres email jest nieprawidłowy');
                    setInvalid(prev => ({ ...prev, password: true }));
                }
                else {
                    setErrorTxt(prev => ({ ...prev, password: '' }));
                    setInvalid(prev => ({ ...prev, password: false }));
                }

                console.log(errorCode, errorMessage);
            });
    }

    /** change data state */
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        return setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return <main className="auth">
        <div className="auth__item">

            {/* title */}
            <h1 className="auth__title">Zaloguj</h1>

            {/* form */}
            <form className="auth__form">
                {/* email input */}
                <label className={`auth__label ${invalid.email ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                    Podaj e-mail
                    <i className="fas fa-at" />
                    <input
                        name='email'
                        value={data.email}
                        className="auth__input"
                        onChange={handleChangeData}
                        required />
                    <span>E-mail</span>
                </label>

                {/* password input */}
                <label className={`auth__label ${invalid.password ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                    Podaj hasło
                    <i className="fas fa-lock" />
                    <input name='password'
                        value={data.password}
                        className="auth__input"
                        onChange={handleChangeData}
                        required />
                    <span>Hasło</span>
                </label>

                {/* errors */}
                <div className="auth__error">{errorTxt.email}</div>
                <div className="auth__error">{errorTxt.password}</div>

                {/* button by which user can trigger logging function */}
                <button className="auth__btn" onClick={handleLogin}>Zaloguj się</button>
            </form>

            {/* other auth sections */}
            <div className="auth__actionBar">
                <Link to='/register'>Utwórz konto</Link>
                <Link to='/password-recovery'>Odzyskaj hasło</Link>
            </div>
        </div>
    </main>
}

