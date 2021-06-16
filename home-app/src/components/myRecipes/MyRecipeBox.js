import {useState} from "react";
import {useHistory, Redirect} from "react-router-dom";
export const MyRecipeBox = ({path, title}) => {
    const [animationClass, setAnimationClass] = useState(false)
    const [flag, setFlag] = useState(false)
    const history = useHistory()
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(()=>{
          //  history.push(`:${path}`)
            setAnimationClass(false)
            setFlag(true)
        }, 1000)
    }
    return (
        <div className={`recipeBox ${animationClass ? "animatedRedirect2" : null}`} onClick={redirect}>
            <span/>
            <h1>
                {title}
                {flag ? <Redirect to={`/myRecipes/${path}`}/> : null}
            </h1>
        </div>
    )
}