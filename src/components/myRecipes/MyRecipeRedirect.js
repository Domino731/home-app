//a component that redirects to a list of specific recipes, is used in MyRecipes component

import {useState} from "react";
import { useHistory} from "react-router-dom";

// props //
// path --> path for redirect
// title --> recipe type title
export const MyRecipeRedirect = ({path, title}) => {

    //flag to overlay animation
    const [animationClass, setAnimationClass] = useState(false)


    const history = useHistory()
    //function, which will put animation on click and then redirect after time
    // flag to overlay animation
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(() => {
            //  history.push(`:${path}`)
            setAnimationClass(false)
            history.push(`/myRecipes/${path}`)
        }, 1000)
    }
    return (
        <div className={`recipeRedirect ${animationClass ? "animatedRedirect--ToCategory" : ''} `} onClick={redirect}>
            <span/>
            <div>
                {title}

            </div>

        </div>
    )
}