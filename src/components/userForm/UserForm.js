//component containing login and registration form, used in PrivateRoute component

import {useState} from "react";
//components
import {UserFormLogin} from "./UserFormLogin";
import {UserFormRegister} from "./UserFormRegister";

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

    return (<section className="container">
        {flag ? <UserFormLogin changeForm={() => handleChangeFlag()}/> : <UserFormRegister changeForm={() => handleChangeFlag()}  />}
    </section>)

}

export default (UserForm)