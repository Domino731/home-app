import { useHistory } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../fireBase/fireBase";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { createUserDatabase } from "../../fireBase/createUserDatabase";

export const Register = () => {

    // state with date needed to loggin user
    const [data, setData] = useState({ email: "", password: "", passwordRepeat: "" });

    const [invalid, setInvalid] = useState({ email: false, password: false, passwordRepeat: false });

    const [emailErrorTxt, setEmailErrorTxt] = useState('');
    //history
    let history = useHistory();

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

        // check if passwords are same
        if (data.password === data.passwordRepeat) {
            setInvalid(prev => ({ ...prev, passwordRepeat: false }));

            return await auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    console.log(userCredential)
                    //creating user database
                    createUserDatabase(userCredential.user.uid)
                    .then(()=> {
                        console.log('Rejestracja przebiagła pomyślnie')
                    })
                })
                .catch((error) => {

                    const errorCode = error.code;
                    const errorMessage = error.message;

                    //setting invalid state by error code
                    if (errorCode === 'auth/email-already-in-use') {
                        setEmailErrorTxt('! Ten adres email jest przypisany już do innego konta');
                        setInvalid(prev => ({ ...prev, email: true }));
                    }
                    else if (errorCode === 'auth/invalid-email') {
                        setEmailErrorTxt('! Podany adres email jest nieprawidłowy');
                        setInvalid(prev => ({ ...prev, email: true }));
                    }
                    else {
                        setEmailErrorTxt('');
                        setInvalid(prev => ({ ...prev, email: false }));
                    }

                    if (errorCode === 'auth/weak-password') {
                        setInvalid(prev => ({ ...prev, password: true }));
                    }
                    else {
                        setInvalid(prev => ({ ...prev, password: false }));
                    }
                    
                    console.log(errorCode, errorMessage)
                })
        }
        else if (data.password !== data.passwordRepeat) {
            setInvalid(prev => ({ ...prev, passwordRepeat: true }));
        }


    }

    return <main className="auth">
        <div className="auth__item">
            <h1 className="auth__title">Rejestracja</h1>
            <form className="auth__form">
                <label className={`auth__label ${invalid.email ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                    Podaj e-mail
                    <i className="fas fa-at" />
                    <input
                        name='email'
                        value={data.email}
                        className="auth__input"
                        onChange={handleChangeData}
                        required
                    />
                    <span>E-mail</span>
                </label>
                <div className="auth__requirements">Hasło powinno składać się z conajmniej 6 znaków</div>
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
                <label className={`auth__label ${invalid.passwordRepeat ? 'auth__label--inCorrect' : 'auth__label--correct'}`}>
                    Powtórz hasło
                    <i className="fas fa-lock" />
                    <input name='passwordRepeat'
                        value={data.passwordRepeat}
                        className="auth__input"
                        onChange={handleChangeData}
                        required />
                    <span>Powtórz hasło</span>
                </label>
                <div className="auth__error">{emailErrorTxt}</div>
                {invalid.passwordRepeat && <div className="auth__error"> ! Wprowadzone hasła nie są identyczne</div>}
                <button className="auth__btn" onClick={createAccount}>Zarejestruj się</button>
            </form>
            <div className="auth__actionBar">
                <Link to='/login'>Zaloguj</Link>
                <Link to='/password-recovery'>Odzyskaj hasło</Link>
            </div>
        </div>
    </main>
}