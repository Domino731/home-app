import {getCategoryText} from "../../functions/getCategoryText";
import {useState} from "react";
import { Redirect} from "react-router-dom";
export const MyRecipesList = (props) => {
    const [animationClass, setAnimationClass] = useState(false)
    const [flag, setFlag] = useState(false)
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(()=>{
            setFlag(true)
        },700)
    }
    return (
        <>
            <div className="titleBar recipesListBar">
                <h2>Dodaj Przepis</h2>
                <strong>W kategorii <i>{getCategoryText(props.match.params.type)}</i></strong>
            </div>
            <button className={`addRecipeBtn ${animationClass && "addRecipeBtn__animation"}`} onClick={redirect}>
                <i className="fas fa-plus"/>

            </button>
            {flag && <Redirect to={`/myRecipes/${props.match.params.type}/add`}/> }
        </>
    )
}