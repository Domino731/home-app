import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../../fireBase/fireBase";

/**
 * Component with form by which user can reset his password
 */
export const PasswordRecovery = () => {

    // state with email, on this adress the mail with next steps for password recovery will be send
    const [email, setEmail] = useState('');

    // state with error text, which is changing when user passed invalid email
    const [errorTxt, setErrorTxt] = useState('');

    // flag which is changing on successful mail send into user's inbox. User to display container with information about successful auth operation 
    const [successfulSend, setSuccessfulSend] = useState(true);

    /**
     * set email with next steps for password recovery
     */
    const handleSendRecoveryMail = (e) => {
        e.preventDefault();

        // send mail with next steps for password reset
        return auth().sendPasswordResetEmail(email)
            // change successfulSend -> container with information about successful operation will be displayed
            .then(() => setSuccessfulSend(true))
            // set error
            .catch((error) => {
                setErrorTxt('! Podany adres email jest nieprawidłowy');
                console.log(error.code, error.message)
            })
    }

    /** change email state */
    const handleChangeEmail = (e) => setEmail(e.target.value);

    return <main className="auth auth--passwordRecovery">

        {/* container with information about successful operation */}
        {successfulSend && <div className="auth__item auth__item--passwordRecovery" >
            <div className="auth__passwordRecovery">
                Na twoją skrzynkę pocztową został wysłany e-mail z kolejnymi krokami.
            </div>

            {/* back to previous section */}
            <div className="auth__actionBar">
                <Link to='/login'>Zaloguj się</Link>
                <Link to='/register'>Zarejestruj się</Link>
            </div>
        </div>}


        {!successfulSend && <div className="auth__item">
            {/* title */}
            <h1 className="auth__title">Odzyskaj hasło</h1>

            {/* form */}
            <form className="auth__form">

                {/* when email passedd by user is invalid then change icon color  */}
                <label className={`auth__label ${errorTxt ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                    Podaj hasło
                    <i className="fas fa-lock" />
                    <input name='email'
                        value={email}
                        className="auth__input"
                        onChange={handleChangeEmail}
                        required />
                    <span>Hasło</span>
                </label>

                {/* error message */}
                <div className="auth__error">{errorTxt}</div>

                {/* button with firebase auth operation */}
                <button className="auth__btn" onClick={handleSendRecoveryMail}>Wyślij e-mail</button>
            </form>

            {/* back to previous section */}
            <div className="auth__actionBar">
                <Link to='/login'>Zaloguj się</Link>
                <Link to='/register'>Zarejestruj się</Link>
            </div>
        </div>}

    </main>
}