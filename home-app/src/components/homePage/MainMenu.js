import {greeting} from "../../functions/greeting";
import {dayName} from "../../functions/greeting";
import {connect} from "react-redux";

import {auth} from "../../fireBase/fireBase";
import {changeUser} from "../../redux/actions/currenUser.actions";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {Redirect} from "react-router-dom";
export const MainMenu = () => {
    const [kitchenAnimation, setKitchenAnimation] = useState(false)
    const [recipesAnimation, setRecipesAnimation] = useState(false)
    const [toDoAnimation, setToDoAnimation] = useState(false)
    const history = useHistory()
    const handleLogOut = () => {
        return auth().signOut()
    }
    const redirect = (setClass, path) => {
        setTimeout(() => {
            history.push(path)
            setClass(false)
        }, 700)
        setClass(true)
    }
    return (
        <section className="container">
            <div className="mainMenu">
                <div className="mainMenu__titleBar">
                    <h1 data-text={greeting()}>{greeting()}</h1>
                    <h2 data-text={dayName()}>{dayName()}</h2>
                </div>
                <div className={`mainMenu__element ${kitchenAnimation ? "animatedRedirect--homePage" : null}`}
                     onClick={() => redirect(setKitchenAnimation, "/myKitchen")}>
                    <strong>Kuchnia</strong>
                </div>
                <div className={`mainMenu__element ${recipesAnimation ? "animatedRedirect--homePage" : null}`}
                     onClick={() => redirect(setRecipesAnimation, "/myRecipes")}>
                    <strong>Przepisy</strong>
                </div>
                <div className={`mainMenu__element ${toDoAnimation ? "animatedRedirect--homePage" : null}`}
                     onClick={() => redirect(setToDoAnimation, "/ToDo")}>
                    <strong>Do zrobienia</strong>
                </div>
                <div className="mainMenu__logOut" onClick={handleLogOut}>
                    <i className="fas fa-sign-out-alt"/>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = state => ({
    user: state.currentUser
})

const mapDispatchToProps = dispatch => ({
    change: data => dispatch(changeUser(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)
