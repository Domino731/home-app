//component responsible for user login, is used in UserForm component
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {auth} from "../../fireBase/fireBase";

// props //
// changeForm --> changing form to register
export const Login = () => {

    // //state with user data
    // const [data, setData] = useState({email: "", password: ""})

    // //state with error if user gives wrong data
    // const [error, setError] = useState("")

    // //function that changing form to register
    // const handleChangeForm = () => {
    //     if (typeof changeForm) {
    //         return changeForm()
    //     }
    // }

    // //function that changing user's data
    // const handleInputChange = (e) => {
    //     const {name, value} = e.target;
    //     setError("")
    //     setData((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    //function that is responsible for login user
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     auth().signInWithEmailAndPassword(data.email, data.password)
    //         .then(() => {
    //             // Signed in
    //             setTimeout(() => {
    //                 history.push("/")
    //             }, 5000)

    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorCode, errorMessage)
    //             setError("Niepoprawny login lub hasło")
    //         });
    // }

    //history
    let history = useHistory();
    return <main className="auth">
        asdasd
        </main>
    
}

