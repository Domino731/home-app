import { useState } from "react";
import { useHistory } from "react-router-dom";

/**
 * Component with recipe redirect container
 * @param {*} recipe - data about single recipe
 */
const MyRecipeBox = ({ recipe }) => {

    // flag to overlay animation
    const [animationClass, setAnimationClass] = useState(false);

    // react router histroy needed to redirect user to specific reciper after delay
    const history = useHistory();

    /** function, which will put animation on click and then redirect after delay (0.7s) */
    const redirect = () => {
        // change animationClass state -> add animation
        setAnimationClass(true);

        // redirect user to particular reciper after delay
        return setTimeout(() => {
            history.push(`/myRecipe/${recipe.id}`);
        }, 700);
    }

    return (
        <div className="recipeBox" onClick={redirect}>
            <div className={`${animationClass && "animatedRedirect--toSingleRecipe2"}`}>
                {recipe.title}
            </div>
            <div className={`recipeBox__products ${animationClass && "animatedRedirect--toSingleRecipe"}`}>
                Przejdź
            </div>
        </div>
    );
}

export default MyRecipeBox;