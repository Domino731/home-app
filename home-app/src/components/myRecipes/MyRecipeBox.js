import {useState} from "react";
import {useHistory} from "react-router-dom";
export const MyRecipeBox = ({path, title}) => {
    const [animationClass, setAnimationClass] = useState(false)
    const history = useHistory()
    const redirect = () => {
        setAnimationClass(true)
        // setTimeout(()=>{
        //     history.push(path)
        //     setAnimationClass(false)
        // })
    }
    return (
        <div className={`recipeBox ${animationClass ? "animatedRedirect2" : null}`} onClick={redirect}>
            <span/>
            <h1>
                {title}
            </h1>
        </div>
    )
}