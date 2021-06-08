
import {connect} from "react-redux";
import {auth} from "../../fireBase/fireBase";
import {Route} from "react-router-dom";
{/*<h1>{JSON.stringify(user)}</h1>*/}
{/*<div onClick={() => auth().signOut()}>Wyloguj się</div> */}
const MainMenu = ({user}) => {
    return (
        <section>

        </section>
    )
}
const mapStateToProps = state => ({
    user: state.currentUser
})
export default connect(mapStateToProps)(MainMenu)