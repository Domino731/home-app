import {useHistory} from "react-router-dom";
import {useState} from "react";
import {auth} from "../../fireBase/fireBase";
import {SuccessfulForm} from "./SuccessfulForm";

export const UserFormLogin = ({changeForm}) => {
    const [data, setData] = useState({email: "", password: "", userName: ""})
    const [error, setError] = useState("")
    const [successful, setSuccessful] = useState(false)
    const handleChangeForm = () => {
        if (typeof changeForm) {
            return changeForm()
        }
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setError("")
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        auth().signInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                // Signed in
                setTimeout(() => {
                    history.push("/")
                }, 5000)
                //const user = userCredential.user;
                setSuccessful(true)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setError("Niepoprawny login lub hasło")
            });
    }
    let history = useHistory();
    return (<>

            {successful === false && <section className="container">
                <div className="userForm">
                    <h1 className="userForm__title">ZALOGUJ</h1>
                    <div className="userForm__line"/>
                    <form className="userForm__form">
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

                    </form>
                    <div className="userForm__line"/>
                    {error !== "" && <div className="userForm__invalidData">{error}</div>}
                    <div className="userForm__btn">
                        <button onClick={handleSubmit}>Zaloguj się</button>
                    </div>
                    <span className="userForm__question" onClick={handleChangeForm}>Nie masz jeszcze konta ?</span>
                </div>
            </section>}
            {successful && <SuccessfulForm text={"Zalogowano"}/>}
        </>
    )
}

