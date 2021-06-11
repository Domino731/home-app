import {greeting} from "../../functions/greeting";
import {dayName} from "../../functions/greeting";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {auth} from "../../fireBase/fireBase";
import {changeUser} from "../../redux/actions/currenUser.actions";
import {useHistory} from "react-router-dom";
import {useState} from "react";

export const MainMenu = ({user, change}) => {
    const [kitchenClass, setKitchenClass] = useState(false)
    const [recipesClass, setRecipesClass] = useState(false)
    const history = useHistory()
    const handleLogOut = () => {
        auth().signOut()
    }
    const redirect = (setClass, path) => {
        setTimeout(() => {
            history.push(path)

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
                <div className={`mainMenu__element ${kitchenClass ? "animatedRedirect" : null}`}
                     onClick={() => redirect(setKitchenClass, "/myKitchen")}>
                    <strong>Kuchnia</strong>
                </div>
                <div className={`mainMenu__element ${recipesClass ? "animatedRedirect" : null}`}
                     onClick={() => redirect(setRecipesClass, "/myRecipes")}>
                    <strong>Kuchnia</strong>
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
