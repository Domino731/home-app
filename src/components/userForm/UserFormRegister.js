//component responsible for user register, is used in UserForm component
import { useEffect, useState } from "react"
import { auth } from "../../fireBase/fireBase";
import { userFormRegisterValidate } from "../../functions/userFormRegisterValidate";
import { createUserDatabase } from "../../fireBase/createUserDatabase";


export const UserFormRegister = ({ changeForm }) => {
    // state with new account
    const [data, setData] = useState({ email: "",password: "", passwordRepeat: "" })

    //state with errors
    const [invalid, setInvalid] = useState({ email: "", password: "" })

    //flag which shows button
    const [buttonFlag, setButtonFlag] = useState(false)


    //listening for the correctness of user input, the button appears only if all conditions are true
    useEffect(() => {
        console.log(data.password)
        console.log(data.password.length)
        console.log(data.password.length >= 6 )
        if (data.email.length > 5 && data.password.length >= 6 && data.passwordRepeat === data.password) {
            setButtonFlag(true)
        } else {
            setButtonFlag(false)
        }
    }, [data])

    //function that changing form to login
    const handleChangeForm = () => {
        if (typeof changeForm) {
            return changeForm()
        }
    }

    //function that changing data state
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
        setInvalid((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    //function that after click checking the specified user name exists in firestore (collection users),
    // if not call register function,else setInvalid
    const handleRegister = async (e) => {
        e.preventDefault()
        return await auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            console.log(userCredential)
            //creating user database
            createUserDatabase(userCredential.user.uid)
        })
        .catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            //setting invalid state by error code
            userFormRegisterValidate(errorCode, errorMessage, setInvalid)
        })
    }
    return (

        <section className="container">
            <div className="userForm">
                <h1 className="userForm__title">ZAREJESTRUJ</h1>
                <div className="userForm__line" />
                <form className="userForm__form">

                

                    {/*email*/}
                    <div className="userForm__element">
                        <i className="fas fa-envelope" />
                        <input type="text" placeholder="E-mail"
                            value={data.email} name="email"
                            onChange={handleDataChange} />
                    </div>

                    {/*password*/}
                    <div className="userForm__element">
                        <i className="fas fa-lock" />
                        <input type="password" placeholder="Hasło"
                            name="password" value={data.password} onChange={handleDataChange} maxLength="15" />
                    </div>

                    {/*password repeat*/}
                    <div className="userForm__element">
                        <i className="fas fa-unlock" />
                        <input type="password" placeholder=" powtórz hasło"
                            name="passwordRepeat" value={data.passwordRepeat} onChange={handleDataChange}
                            maxLength="15" />
                    </div>
                </form>
                <div className="userForm__line" />

                {/*errors*/}
                <div className="userForm__invalidData">
                    <p>{invalid.email}</p>
                    <p>{invalid.password}</p>

                </div>
                <div className="userForm__btn">

                    {/*the button appears only if all conditions are true*/}
                    {buttonFlag && <button onClick={handleRegister}> Zarejestruj się</button>}
                </div>
                <span className="userForm__question" onClick={handleChangeForm}>Posiadasz już swoje konto ?</span>
            </div>

            <a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpouch - www.freepik.com</a>
            
        </section>

        
    )
}
