import { useState} from "react";
import {Redirect} from "react-router-dom";


const MyRecipeBox = ({recipe}) => {
    const [animationClass, setAnimationClass] = useState(false)
    const [flag, setFlag] = useState(false)

    const redirect = () => {
        setAnimationClass(true)
        setTimeout(() => {
            setFlag(true)
        }, 700)
    }
    return (
        <section className="recipeBox" onClick={redirect}>
            <h3 className={`${animationClass && "animatedRedirect--toSingleRecipe2"}`}>
                {recipe.title}
            </h3>
            <div className={`recipeBox__products ${animationClass && "animatedRedirect--toSingleRecipe"}`}>
                Przejdź
            </div>

            {flag && <Redirect to={`/myRecipe/${recipe.id}`}/>}
        </section>
    )
}



export default MyRecipeBox;