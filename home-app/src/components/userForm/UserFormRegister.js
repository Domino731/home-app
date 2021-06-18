import {useState} from "react"
import {auth} from "../../fireBase/fireBase";
import { useHistory} from "react-router-dom";
import {userFormRegisterValidate} from "../../functions/userFormRegisterValidate";
import {SuccessfulForm} from "./SuccessfulForm";
import {createUserDatabase} from "../../functions/createUserDatabase";

export const UserFormRegister = ({changeForm}) => {
    const [data, setData] = useState({email: "", userName: "", password: "", passwordRepeat: ""})
    const [invalid, setInvalid] = useState({email: "", password: "", passwordRepeat: ""})
    const [isInvalid, setIsInvalid] = useState(false);
    const [successful, setSuccessful] = useState(false)
    let history = useHistory()
    const handleChangeForm = () => {
        if (typeof changeForm) {
            return changeForm()
        }
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const register = () => {
        auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {

                // Signed in
                const user = userCredential.user;
                setTimeout(() => {
                    history.push("/")
                }, 5000)
                setSuccessful(true)
                return user.updateProfile({
                    displayName: data.userName
                })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                userFormRegisterValidate(errorCode, errorMessage, setInvalid)
                setIsInvalid(true)
            })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (data.password === data.passwordRepeat) {
            register()
            createUserDatabase(data.userName)

        } else {
            setInvalid(prev => ({...prev, password: "*Hasła nie są takie same"}))
        }

    }

    return (
        <>
            {successful === false && <section className="container">
                <div className="userForm">
                    <h1 className="userForm__title">ZAREJESTRUJ</h1>
                    <div className="userForm__line"/>
                    <form className="userForm__form">
                        <div className="userForm__element">
                            <i className="fas fa-envelope"/>
                            <input type="text" placeholder="Nazwa Użytkownika"
                                   value={data.userName} name="userName"
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-envelope"/>
                            <input type="text" placeholder="E-mail"
                                   value={data.email} name="email"
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-lock"/>
                            <input type="password" placeholder="Hasło"
                                   name="password" value={data.password} onChange={handleInputChange}/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-unlock"/>
                            <input type="password" placeholder=" powtórz hasło"
                                   name="passwordRepeat" value={data.passwordRepeat} onChange={handleInputChange}/>
                        </div>
                    </form>
                    <div className="userForm__line"/>
                    {isInvalid &&
                    <div className="userForm__invalidData">
                        <p>{invalid.email}</p>
                        <p>{invalid.password}</p>
                        <p>{invalid.passwordRepeat}</p>
                    </div>
                    }
                    <div className="userForm__btn">
                        <button onClick={handleFormSubmit}> Zarejestruj się</button>
                    </div>
                    <span className="userForm__question" onClick={handleChangeForm}>Posiadasz już swoje konto ?</span>
                </div>
            </section>}
            {successful && <SuccessfulForm text={"Zarejestrowano"}/>}
        </>
    )
}

