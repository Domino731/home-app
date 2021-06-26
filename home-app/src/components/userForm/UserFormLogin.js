//component responsible for user login, is used in UserForm component
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {auth} from "../../fireBase/fireBase";

// props //
// changeForm --> changing form to register
export const UserFormLogin = ({changeForm}) => {

    //state with user data
    const [data, setData] = useState({email: "", password: ""})

    //state with error if user gives wrong data
    const [error, setError] = useState("")

    //function that changing form to register
    const handleChangeForm = () => {
        if (typeof changeForm) {
            return changeForm()
        }
    }

    //function that changing user's data
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setError("")
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //function that is responsible for login user
    const handleSubmit = (e) => {
        e.preventDefault()
        auth().signInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                // Signed in
                setTimeout(() => {
                    history.push("/")
                }, 5000)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setError("Niepoprawny login lub hasło")
            });
    }

    //history
    let history = useHistory();
    return (<>

           <section className="container">
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

                    {/*if user gives wrong email or password show error*/}
                    {error !== "" && <div className="userForm__invalidData">{error}</div>}

                    <div className="userForm__btn">
                        <button onClick={handleSubmit}>Zaloguj się</button>
                    </div>

                    {/*show register form*/}
                    <span className="userForm__question" onClick={handleChangeForm}>Nie masz jeszcze konta ?</span>
                </div>
            </section>
        </>
    )
}

