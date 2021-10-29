//home page which redirects to a particular section
import {greeting} from "../../functions/greeting";
import {dayName} from "../../functions/greeting";
import {auth} from "../../fireBase/fireBase";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {setProducts, setRecipes, setToDos} from "../../redux/actions/firebaseData.actions";
import {connect} from "react-redux";

// props //
// --> deleting user's stuff by redux actions
export const HomePage = ({setProducts, setRecipes,  setToDos}) => {
    //the states by which the animation is applied
    const [kitchenAnimation, setKitchenAnimation] = useState(false)
    const [recipesAnimation, setRecipesAnimation] = useState(false)
    const [toDoAnimation, setToDoAnimation] = useState(false)


    //log out function
    const handleLogOut = () => {
        setRecipes(null)
        setProducts(null)
        setToDos(null)
        return auth().signOut()

    }


    //A function superimposed on a menu item, when clicked, an animation is superimposed and after 0.7s redirected
    // path --> path for redirect
    // setAnimation --> change animation state
    const history = useHistory()
    const redirect = (setAnimation, path) => {
        setAnimation(true)
        setTimeout(() => {
            history.push(path)
            setAnimation(false)
        }, 700)
    }


    return (
        <section className="container">
            <div className="mainMenu">

                {/*top bar with greeting*/}
                <div className="mainMenu__titleBar">
                    <h1 data-text={greeting()}>{greeting()}</h1>
                    <h2 data-text={dayName()}>{dayName()}</h2>
                </div>

                {/*redirection to kitchen component*/}
                <div className={`mainMenu__element  mainMenu__element--kitchen ${kitchenAnimation ? "animatedRedirect--homePage" : null}`}
                     onClick={() => redirect(setKitchenAnimation, "/myKitchen")}>
                    <strong>Kuchnia</strong>
                </div>

                {/*redirection to recipes component*/}
                <div className={`mainMenu__element  mainMenu__element--recipes ${recipesAnimation ? "animatedRedirect--homePage" : null}`}
                     onClick={() => redirect(setRecipesAnimation, "/myRecipes")}>
                    <strong>Przepisy</strong>
                </div>

                {/*redirection to toDo  component*/}
                <div className={`mainMenu__element  mainMenu__element--toDo ${toDoAnimation ? "animatedRedirect--homePage" : null}`}
                     onClick={() => redirect(setToDoAnimation, "/ToDo")}>
                    <strong>Do zrobienia</strong>
                </div>


                {/*log out*/}
                <div className="mainMenu__logOut" onClick={handleLogOut} title='Wyloguj się'>
                    <i className="fas fa-sign-out-alt"/>
                </div>

            </div>
        </section>
    )
}


const mapDispatchToProps = dispatch => ({
    setProducts: data => dispatch(setProducts(data)),
    setRecipes: data => dispatch(setRecipes(data)),
    setToDos: data => dispatch(setToDos(data))
})
export default connect(null, mapDispatchToProps)(HomePage)


