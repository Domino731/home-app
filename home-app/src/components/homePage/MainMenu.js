import {greeting} from "../../functions/greeting";
import {dayName} from "../../functions/greeting";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {auth} from "../../fireBase/fireBase";
import {Route} from "react-router-dom";
import {changeUser} from "../../redux/actions/currenUser.actions";


const MainMenus = ({user, change}) => {
    const handleLogout = () => {
        change(null)
    }
    return (
        <section>
            <h1>{JSON.stringify(user)}</h1>
            <div onClick={handleLogout}>Wyloguj się</div>
        </section>
    )
}


export const MainMenu = () => {
    return (
        <section className="container">
            <div className="mainMenu">
                <div className="mainMenu__titleBar">
                    <h1 data-text={greeting()}>{greeting()}</h1>
                    <h2 data-text={dayName()}>{dayName()}</h2>
                </div>
                <div className="mainMenu__element">
                    <Link to="/mykitchen">Kuchnia</Link>
                </div>
                <div className="mainMenu__element">
                    <Link to="/mykitchen">Przepisy</Link>
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
