import {useState} from "react"
import {registerDB} from "../../fireBase/registerFB";

export const UserFormRegister = () => {
    const [data, setData] = useState({email: "", password: "", userName: ""})
    const [invalid, setInvalid] = useState({email: "", password: "", userName: ""})

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleChange = (e) => {
        e.preventDefault()
        if (data.password.length <= 8) {
            setInvalid(prev => ({...prev, password: "*hasło jest za krótkie"}))
        }
        if (data.userName.length <= 3) {
            setInvalid(prev => ({...prev, userName: "*Nazwa użytkownika jest za krótka"}))
        }
        if (data.password.length >= 8 && data.userName.length >= 3) {
            registerDB(data)
        }
    }

    return (
        <>
            <style>{`body {
              background: rgb(48, 169, 222);
  background: linear-gradient(142deg, rgba(48, 169, 222, 1) 0%, rgba(44, 79, 180, 1) 77%), rgba(48, 169, 222, 1))} 
            `}</style>
            <section className="container">
                <div className="userForm">
                    <i className="fas fa-clipboard-list"/>
                    <form className="userForm__box" onSubmit={handleChange}>
                        <div className="userForm__element">
                            <i className="fas fa-user"/> <input type="email" name="email"
                                                                onChange={handleInputChange} value={data.email}/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-lock"/> <input type="password" className="signIn__input"
                                                                name="password"
                                                                onChange={handleInputChange} value={data.password}
                                                                placeholder="minimum 8 znaków"/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-lock"/> <input type="text" className="signIn__input" name="userName"
                                                                onChange={handleInputChange} value={data.userName}
                                                                placeholder="minimum 3 znaki"/>
                        </div>


                        <button className="userForm__button">ZAREJESTRUJ SIĘ</button>


                        <div className="form__invalid">
                            <p>{invalid.email}</p>
                            <p>{invalid.userName}</p>
                            <p>{invalid.password}</p>
                        </div>


                    </form>
                </div>
            </section>
        </>
    )
}