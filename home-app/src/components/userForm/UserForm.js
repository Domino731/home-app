import {UserFormLogin} from "./UserFormLogin";
import {UserFormRegister} from "./UserFormRegister";
import {useState} from "react";

const UserForm = () => {
    const [flag, setFlag] = useState(true)
    const handleChangeFlag = () => setFlag(flag ? false : true)


    return (<section className="container">
        {flag ? <UserFormLogin changeForm={() => handleChangeFlag()}/> : <UserFormRegister changeForm={() => handleChangeFlag()}  />}
    </section>)

}

export default (UserForm)