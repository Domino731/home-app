//home page which redirects to a particular section
import { greeting } from "../../functions/greeting";
import { dayName } from "../../functions/greeting";
import { auth } from "../../fireBase/fireBase";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { setProducts, setRecipes, setToDos } from "../../redux/actions/firebaseData.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import kitchenIcon from "../../images/diet.svg";
import recipesIcon from "../../images/recipes.svg";
import tasksIcon from "../../images/task.svg";
// props //
// --> deleting user's stuff by redux actions
export const HomePage = ({ setProducts, setRecipes, setToDos }) => {
    //the states by which the animation is applied
    const [kitchenAnimation, setKitchenAnimation] = useState(false)
    const [recipesAnimation, setRecipesAnimation] = useState(false)
    const [toDoAnimation, setToDoAnimation] = useState(false)


    //log out function
    const handleLogOut = () => {
        // clear redux state
        setRecipes(null);
        setProducts(null);
        setToDos(null);

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
        <main className='container container--menu' >

            {/*top bar with greeting*/}
            <header className="menu__titleBar">
                <h1 data-text={greeting()}>{greeting()}</h1>
                <h2 data-text={dayName()}>{dayName()}</h2>
            </header>

            <nav >
               <ul className="menu__list menu__padding">
                   <li className="menu__item menu__neumorphism" >
                       <Link to='/mykitchen'>
                           <img src={kitchenIcon}className='menu__icon' alt='Diet' />
                           <strong className="menu__name"> Moje produkty </strong>
                       </Link>
                   </li>
                   <li className="menu__item  menu__neumorphism">
                       <Link to='/myRecipes'>
                       <img src={recipesIcon}className='menu__icon' alt='Recipes book' />
                       <strong className="menu__name"> Przepisy </strong>
                       </Link>
                   </li>
                   <li className="menu__item menu__neumorphism">
                       <Link to='/tasks'>
                       <img src={tasksIcon}className='menu__icon' alt='Task board' />
                       <strong className="menu__name"> Do zrobienia </strong>
                       </Link>
                   </li>
               </ul>
            </nav>

            <div className="menu__logoutWrapper menu__padding ">
               <button className="menu__btn menu__neumorphism">Wyloguj <i className="fas fa-sign-out-alt"/></button>
            </div>
        </main>
    )
}


const mapDispatchToProps = dispatch => ({
    setProducts: data => dispatch(setProducts(data)),
    setRecipes: data => dispatch(setRecipes(data)),
    setToDos: data => dispatch(setToDos(data))
})
export default connect(null, mapDispatchToProps)(HomePage)


