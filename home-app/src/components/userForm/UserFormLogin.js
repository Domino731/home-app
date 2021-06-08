import {Link, useHistory} from "react-router-dom";
import {useState} from "react";
import {auth} from "../../fireBase/fireBase";


export const UserFormLogin = () => {
    const [data, setData] = useState({email: "", password: "", userName: ""})
    let history = useHistory();
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        auth().signInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                // Signed in
                history.push("/")
                const user = userCredential.user;
                console.log(true)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    return (
        <>
            <style>{`body {
              background: rgb(48, 169, 222);
  background: linear-gradient(142deg, rgba(48, 169, 222, 1) 0%, rgba(44, 79, 180, 1) 77%), rgba(48, 169, 222, 1))} 
            `}</style>
            <section className="container">
                <div className="userForm">
                    <i className="far fa-user userForm__icon"/>
                    <form className="userForm__box" onSubmit={handleSubmit}>
                        <div className="userForm__element">
                            <i className="fas fa-user"/> <input type="text" placeholder="E-mail"
                                                                value={data.email} name="email" onChange={handleInputChange}/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-lock"/> <input type="password" placeholder="Password"
                         name="password" value={data.password} onChange={handleInputChange}/>
                        </div>
                        <button className="userForm__button" >ZALOGUJ SIĘ</button>
                        <div className="userForm__options">
                            <Link to="/register">Zarejestruj się</Link>
                            <Link>Zresetuj hasło</Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

