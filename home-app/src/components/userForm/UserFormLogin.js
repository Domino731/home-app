import {Link} from "react-router-dom";

export const UserFormLogin = () => {
    return (
        <>
            <style>{`body {
              background: rgb(48, 169, 222);
  background: linear-gradient(142deg, rgba(48, 169, 222, 1) 0%, rgba(44, 79, 180, 1) 77%), rgba(48, 169, 222, 1))} 
            `}</style>
            <section className="container">
                <div className="userForm">
                    <i className="far fa-user userForm__icon"/>
                    <form className="userForm__box">
                        <div className="userForm__element">
                            <i className="fas fa-user"/> <input type="text" placeholder="E-mail"/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-lock"/> <input type="password" placeholder="Password"/>
                        </div>
                        <button className="userForm__button">ZALOGUJ SIĘ</button>
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

