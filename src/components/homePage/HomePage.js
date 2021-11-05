//home page which redirects to a particular section
import { greeting } from "../../functions/greeting";
import { dayName } from "../../functions/greeting";
import { auth } from "../../fireBase/fireBase";
import { setProducts, setRecipes, setToDos } from "../../redux/actions/firebaseData.actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import kitchenIcon from "../../images/diet.svg";
import recipesIcon from "../../images/recipes.svg";
import tasksIcon from "../../images/task.svg";

/**
 * Home page component where user can select specific section
 * @param setProducts - REDUX ACTION - function that will clear products state in redux after successfull logout
 * @param setRecipes - REDUX ACTION - function that will clear recipes state in redux after successfull logout
 * @param setToDos - REDUX ACTION - function that will clear ToDo state in redux after successfull logout
 * @returns 
 */
export const HomePage = ({ setProducts, setRecipes, setToDos }) => {

    /** logout the user */
    const handleLogOut = () => {
        return auth().signOut();
    }

    return  <main className='container container--menu' >

            {/*top bar with greeting text */}
            <header className="menu__titleBar">
                <h1 data-text={greeting()}>{greeting()}</h1>
                <h2 data-text={dayName()}>{dayName()}</h2>
            </header>

            {/* navigation */}
            <nav >
                <ul className="menu__list menu__padding">
                    {/* products link */}
                    <li className="menu__item menu__neumorphism" >
                        <Link to='/mykitchen'>
                            <img src={kitchenIcon} className='menu__icon' alt='Diet' />
                            <strong className="menu__name"> Moje produkty </strong>
                        </Link>
                    </li>

                    {/* recipes link */}
                    <li className="menu__item  menu__neumorphism">
                        <Link to='/myRecipes'>
                            <img src={recipesIcon} className='menu__icon' alt='Recipes book' />
                            <strong className="menu__name"> Przepisy </strong>
                        </Link>
                    </li>

                    {/* tasks link */}
                    <li className="menu__item menu__neumorphism">
                        <Link to='/tasks'>
                            <img src={tasksIcon} className='menu__icon' alt='Task board' />
                            <strong className="menu__name"> Do zrobienia </strong>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* button by which user can logout  */}
            <div className="menu__logoutWrapper menu__padding ">
                <button className="menu__btn menu__neumorphism" onClick={handleLogOut}>Wyloguj <i className="fas fa-sign-out-alt" /></button>
            </div>
        </main>
}


