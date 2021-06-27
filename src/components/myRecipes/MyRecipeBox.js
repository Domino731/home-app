//a component containing the name of the recipe and a redirect to its component, it used in MyRecipesList component

import { useState} from "react";
import {useHistory} from "react-router-dom";


const MyRecipeBox = ({recipe}) => {
    //flag to overlay animation
    const [animationClass, setAnimationClass] = useState(false)

    const history = useHistory()
    //function, which will put animation on click and then redirect after time
    // flag to overlay animation
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(() => {
            history.push(`/myRecipe/${recipe.id}`)
        }, 700)
    }
    return (
        <li className="recipeBox" onClick={redirect}>
            <h3 className={`${animationClass && "animatedRedirect--toSingleRecipe2"}`}>
                {recipe.title}
            </h3>
            <div className={`recipeBox__products ${animationClass && "animatedRedirect--toSingleRecipe"}`}>
                Przejdź
            </div>
        </li>
    )
}



export default MyRecipeBox;