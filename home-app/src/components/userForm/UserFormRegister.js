import {useEffect, useState} from "react"
import {auth} from "../../fireBase/fireBase";
import {useHistory} from "react-router-dom";
import {userFormRegisterValidate} from "../../functions/userFormRegisterValidate";
import {SuccessfulForm} from "./SuccessfulForm";
import {createUserDatabase} from "../../functions/createUserDatabase";
import {getUsers} from "../../functions/getDataFromFirestore";

export const UserFormRegister = ({changeForm}) => {
    const [data, setData] = useState({email: "", userName: "", password: "", passwordRepeat: ""})
    const [invalid, setInvalid] = useState({email: "", password: "", passwordRepeat: "", userName: ""})
    const [buttonFlag, setButtonFlag] = useState(false)
    const [successful, setSuccessful] = useState(false)
    const [users, setUsers] = useState(null)
    useEffect(() => {
        getUsers(setUsers)
    }, [])
    useEffect(() => {
        if (data.email.length > 5 && data.userName.length > 3 && data.password >= 6 && data.passwordRepeat === data.password) {
            setButtonFlag(true)
        }
        else{
            setButtonFlag(false)
        }
    }, [data.email, data.userName, data.passwordRepeat, data.password])
    let history = useHistory()
    const handleChangeForm = () => {
        if (typeof changeForm) {
            return changeForm()
        }
    }
    const handleDataChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
        setInvalid((prev) => ({
            ...prev,
            [name]: ""
        }));
    };
    const handleRegister = (e) => {
        e.preventDefault()
        if (users.includes(data.userName) === false) {
            console.log("Użytkownika nie ma z bazie")
            auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    console.log("rerejstarcja powiodła się")
                    createUserDatabase(data.userName)
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
                })
        }
        else{
            setInvalid(prev => ({...prev, userName: "Nazwa użytkownika jest zajęta"}))
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
                                   onChange={handleDataChange}/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-envelope"/>
                            <input type="text" placeholder="E-mail"
                                   value={data.email} name="email"
                                   onChange={handleDataChange}/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-lock"/>
                            <input type="password" placeholder="Hasło"
                                   name="password" value={data.password} onChange={handleDataChange}/>
                        </div>
                        <div className="userForm__element">
                            <i className="fas fa-unlock"/>
                            <input type="password" placeholder=" powtórz hasło"
                                   name="passwordRepeat" value={data.passwordRepeat} onChange={handleDataChange}/>
                        </div>
                    </form>
                    <div className="userForm__line"/>
                    <div className="userForm__invalidData">
                        <p>{invalid.userName}</p>
                        <p>{invalid.email}</p>
                        <p>{invalid.password}</p>

                    </div>
                    <div className="userForm__btn">
                        {buttonFlag && <button onClick={handleRegister}> Zarejestruj się</button>}
                    </div>
                    <span className="userForm__question" onClick={handleChangeForm}>Posiadasz już swoje konto ?</span>
                </div>
            </section>}
            {successful && <SuccessfulForm text={"Zarejestrowano"}/>}
        </>
    )
}
// import {useEffect, useState} from "react"
// import {auth} from "../../fireBase/fireBase";
// import { useHistory} from "react-router-dom";
// import {userFormRegisterValidate} from "../../functions/userFormRegisterValidate";
// import {SuccessfulForm} from "./SuccessfulForm";
// import {createUserDatabase} from "../../functions/createUserDatabase";
// import {getUsers} from "../../functions/getDataFromFirestore";
//
// export const UserFormRegister = ({changeForm}) => {
//     const [data, setData] = useState({email: "", userName: "", password: "", passwordRepeat: ""})
//     const [invalid, setInvalid] = useState({email: "", password: "", passwordRepeat: "", userName: ""})
//     const [isInvalid, setIsInvalid] = useState(false);
//     const [successful, setSuccessful] = useState(false)
//     const [users, setUsers] = useState(null)
//     useEffect(()=>{
//         getUsers(setUsers)
//     },[])
//     let history = useHistory()
//     const handleChangeForm = () => {
//         if (typeof changeForm) {
//             return changeForm()
//         }
//     }
//     const handleInputChange = (e) => {
//         const {name, value} = e.target;
//
//         setData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };
//     const register = () => {
//         auth().createUserWithEmailAndPassword(data.email, data.password)
//             .then((userCredential) => {
//                 createUserDatabase(data.userName)
//                 const user = userCredential.user;
//                 setTimeout(() => {
//                     history.push("/")
//                 }, 5000)
//                 setSuccessful(true)
//                 return user.updateProfile({
//                     displayName: data.userName
//                 })
//
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 userFormRegisterValidate(errorCode, errorMessage, setInvalid)
//                 setIsInvalid(true)
//             })
//     }
//     const handleFormSubmit = (e) => {
//         e.preventDefault()
//         if (users.includes(data.userName) === false) {
//             register()
//         }
//         if(users.includes(data.userName)){
//             console.log(false)
//             setInvalid(prev => ({...prev, userName: "Nazwa użytkownika jest zajęta"}))
//         }
//     }
//     return (
//         <>
//             {successful === false && <section className="container">
//                 <div className="userForm">
//                     <h1 className="userForm__title">ZAREJESTRUJ</h1>
//                     <div className="userForm__line"/>
//                     <form className="userForm__form">
//                         <div className="userForm__element">
//                             <i className="fas fa-envelope"/>
//                             <input type="text" placeholder="Nazwa Użytkownika"
//                                    value={data.userName} name="userName"
//                                    onChange={handleInputChange}/>
//                         </div>
//                         <div className="userForm__element">
//                             <i className="fas fa-envelope"/>
//                             <input type="text" placeholder="E-mail"
//                                    value={data.email} name="email"
//                                    onChange={handleInputChange}/>
//                         </div>
//                         <div className="userForm__element">
//                             <i className="fas fa-lock"/>
//                             <input type="password" placeholder="Hasło"
//                                    name="password" value={data.password} onChange={handleInputChange}/>
//                         </div>
//                         <div className="userForm__element">
//                             <i className="fas fa-unlock"/>
//                             <input type="password" placeholder=" powtórz hasło"
//                                    name="passwordRepeat" value={data.passwordRepeat} onChange={handleInputChange}/>
//                         </div>
//                     </form>
//                     <div className="userForm__line"/>
//                     {isInvalid &&
//                     <div className="userForm__invalidData">
//                         <p>{invalid.userName}</p>
//                         <p>{invalid.email}</p>
//                         <p>{invalid.password}</p>
//                         <p>{invalid.passwordRepeat}</p>
//
//                     </div>
//                     }
//                     <div className="userForm__btn">
//                         <button onClick={handleFormSubmit}> Zarejestruj się</button>
//                     </div>
//                     <span className="userForm__question" onClick={handleChangeForm}>Posiadasz już swoje konto ?</span>
//                 </div>
//             </section>}
//             {successful && <SuccessfulForm text={"Zarejestrowano"}/>}
//         </>
//     )
// }

