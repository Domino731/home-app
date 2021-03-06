import { useState } from "react";
import { auth } from "../../fireBase/fireBase";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { createUserDatabase } from "../../fireBase/createUserDatabase";

/**
 * Component by which user can create his account in firebase service (data structure is described in docs) 
 */
export const Register = () => {

    // state with date needed to create new accout 
    const [data, setData] = useState({ email: "", password: "", passwordRepeat: "" });

    //  invalid states, needed to change color of icon when user passed invalid data
    const [invalid, setInvalid] = useState({ email: false, password: false, passwordRepeat: false });

    // text with error of email
    const [emailErrorTxt, setEmailErrorTxt] = useState('');

    /** change data state */
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        return setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // create user's account in firebase authentication base and his profile in firestore ('users' collection)
    const createAccount = async (e) => {
        e.preventDefault()

        // remove previous errors
        setInvalid({ email: false, password: false, passwordRepeat: false });
        setInvalid(prev => ({...prev, email: ''}));
        setEmailErrorTxt('');
        
        // check if the passwords are same
        if (data.password === data.passwordRepeat) {

            // remove password repeat error
            setInvalid(prev => ({ ...prev, passwordRepeat: false }));

            // creating user's account in firestore and in auth section
            return await auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {

                    //creating user database
                    createUserDatabase(userCredential.user.uid)
                        .then(() => {
                            console.log('User account has been created successfully :)')
                        })
                })
                // set erros
                .catch((error) => {

                    const errorCode = error.code;
                    const errorMessage = error.message;

                    //setting invalid state by error code
                    if (errorCode === 'auth/email-already-in-use') {
                        setEmailErrorTxt('! Ten adres e-mail jest przypisany ju?? do innego konta');
                        setInvalid(prev => ({ ...prev, email: true }));
                    }
                    else if (errorCode === 'auth/invalid-email') {
                        setEmailErrorTxt('! Podany adres e-mail jest nieprawid??owy');
                        setInvalid(prev => ({ ...prev, email: true }));
                    }
                    // remove errors if there is no email error
                    else {
                        setEmailErrorTxt('');
                        setInvalid(prev => ({ ...prev, email: false }));
                    }

                    // set password errors
                    if (errorCode === 'auth/weak-password') {
                        setInvalid(prev => ({ ...prev, password: true }));
                    }
                    // remove errors if there is no password error
                    else {
                        setInvalid(prev => ({ ...prev, password: false }));
                    }

                    console.log(errorCode, errorMessage);
                })
        }
        else if (data.password !== data.passwordRepeat) {
            return setInvalid(prev => ({ ...prev, passwordRepeat: true }));
        }


    }

    return <main className="auth auth--register">
        <div className="auth__item">
            {/* title */}
            <h1 className="auth__title">Rejestracja</h1>

            {/* form  */}
            <form className="auth__form">

                {/* email label */}
                <label className={`auth__label ${invalid.email ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                    Podaj e-mail
                    <i className="fas fa-at" />
                    <input
                    type='text'
                        name='email'
                        value={data.email}
                        className="auth__input"
                        onChange={handleChangeData}
                        required
                    />
                    <span>E-mail</span>
                </label>

                {/* text about password requirements  */}
                <div className={`auth__requirements ${invalid.password && 'auth__requirements--error'}`}>Has??o powinno sk??ada?? si?? z conajmniej 6 znak??w</div>

                {/* password input */}
                <label className={`auth__label ${invalid.password ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                    Podaj has??o
                    <i className="fas fa-lock" />
                    <input name='password'
                    type='password'
                        value={data.password}
                        className="auth__input"
                        onChange={handleChangeData}
                        required />
                    <span>Has??o</span>
                </label>

                {/* password repeat input */}
                <label className={`auth__label ${invalid.passwordRepeat ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                    Powt??rz has??o
                    <i className="fas fa-lock" />
                    <input name='passwordRepeat'
                    type='password'
                        value={data.passwordRepeat}
                        className="auth__input"
                        onChange={handleChangeData}
                        required />
                    <span>Powt??rz has??o</span>
                </label>

                {/* errors */}
                <div className="auth__error">{emailErrorTxt}</div>
                {invalid.passwordRepeat && <div className="auth__error"> ! Wprowadzone has??a nie s?? identyczne</div>}

                {/* button with firebase auth operation */}
                <button className="auth__btn" onClick={createAccount}>Zarejestruj si??</button>
            </form>

            {/* other authentication sections */}
            <div className="auth__actionBar">
                <Link to='/login'>Zaloguj</Link>
                <Link to='/password-recovery'>Odzyskaj has??o</Link>
            </div>
        </div>
    </main>
}