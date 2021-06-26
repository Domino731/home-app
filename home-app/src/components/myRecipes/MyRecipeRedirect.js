//a component that redirects to a list of specific recipes, is used in MyRecipes component

import {useState} from "react";
import {Redirect} from "react-router-dom";

// props //
// path --> path for redirect
// title --> recipe type title
export const MyRecipeRedirect = ({path, title}) => {

    //flag to overlay animation
    const [animationClass, setAnimationClass] = useState(false)

    // flag which makes it possible to redirect
    const [flag, setFlag] = useState(false)


    //function, which will put animation on click and then redirect after time
    // flag to overlay animation
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(() => {
            //  history.push(`:${path}`)
            setAnimationClass(false)
            setFlag(true)
        }, 1000)
    }
    return (
        <div className={`recipeRedirect ${animationClass && "animatedRedirect--ToCategory"}`} onClick={redirect}>
            <span/>
            <h1>
                {title}

            </h1>

            {/*redirection to the list of recipes of a specific type*/}
            {flag && <Redirect to={`/myRecipes/${path}`}/>}

        </div>
    )
}