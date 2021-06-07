import {MainMenu} from "./MainMenu";
import {UserFormLogin} from "../userForm/UserFormLogin";

export const HomePage = () => {
    return (
        <main>
            <UserFormLogin/>
            <MainMenu/>
        </main>
    )
}