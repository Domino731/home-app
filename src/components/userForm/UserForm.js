import {useState} from "react";
import {UserFormLogin} from "./UserFormLogin";
import {UserFormRegister} from "./UserFormRegister";
import backgroundAuth from "../../images/background_auth.jpg"
//component containing login and registration form, used in PrivateRoute component
const UserForm = () => {
    // flag which shows login or register form
    const [flag, setFlag] = useState(true)

    //function that change the displaying form
    const handleChangeFlag = () => {
        if(flag){
            setFlag(false)
        }
        else{
            setFlag(true)
        }
    }
//style={{backgroundImage: `url(${backgroundAuth})`}}
    return <section className="container" >
        {flag ? <UserFormLogin changeForm={() => handleChangeFlag()}/> : <UserFormRegister changeForm={() => handleChangeFlag()}  />}
    </section>

}

export default (UserForm)