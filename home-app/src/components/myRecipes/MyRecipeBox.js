import {useState} from "react";
import { Redirect} from "react-router-dom";
export const MyRecipeBox = ({path, title}) => {
    const [animationClass, setAnimationClass] = useState(false)
    const [flag, setFlag] = useState(false)

    const redirect = () => {
        setAnimationClass(true)
        setTimeout(()=>{
          //  history.push(`:${path}`)
            setAnimationClass(false)
            setFlag(true)
        }, 1000)
    }
    return (
        <div className={`recipeBox ${animationClass && "animatedRedirect--ToCategory"}`} onClick={redirect}>
            <span/>
            <h1>
                {title}
                {flag && <Redirect to={`/myRecipes/${path}`}/>}
            </h1>
        </div>
    )
}