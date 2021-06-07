import "./sass/main.scss"
import {HomePage} from "./components/homePage/HomePage";
import {UserFormRegister} from "./components/userForm/UserFormRegister";
import {UserFormLogin} from "./components/userForm/UserFormLogin";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <Route exact path="/" component={HomePage}/>
            <Route  path="/register" component={UserFormRegister}/>
            <Route  path="/login" component={UserFormLogin}/>
        </Router>
    )
}

export default App;
