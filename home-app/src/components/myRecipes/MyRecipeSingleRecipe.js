import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {Loading} from "../loading/Loading";
import {RecipeInstructions} from "./SingleRecipe_subcomponent--RecipeInstructions";
import {RecipeIngredients} from "./SingleRecipe_subcomponent--RecipeIngredient";
import {Redirect} from "react-router-dom";
import {deleteDataFirestore} from "../../functions/deleteDataFirestore";

const MyRecipeSingleRecipe = (props) => {
    const [recipe, setRecipe] = useState([])
    const [flags, setFlags] = useState({instructions: true, ingredients: false})
    const [redirectToEdit, setRedirectToEdit] = useState(false)
    const [redirectToRecipes, setRedirectToRecipes] = useState(false)
    const [animationClassEdit, setAnimationClassEdit] = useState(false)
    const [animationClassDelete, setAnimationClassDelete] = useState(false)
    useEffect(() => {
        if (props.AllRecipes !== null) {
            setRecipe(props.AllRecipes.filter(el => el.id === props.match.params.id))
            setRecipe(prev => prev[0])
        }
        console.log(recipe)
    }, [props])

    const handleChangeFlags = () => {
        if (flags.instructions) {
            setFlags({instructions: false, ingredients: true})
        } else {
            setFlags({instructions: true, ingredients: false})
        }
    }
    const handleRedirectToEdit = () => {
        setAnimationClassEdit(true)
        setTimeout(()=>{
            setRedirectToEdit(true)
        }, 1700)
    }
    const handleDelete = () => {
        setAnimationClassDelete(true)
        setTimeout(()=>{
            deleteDataFirestore(props.match.params.id, props.username, "recipes")
            setRedirectToRecipes(true)
        }, 1700)
    }

    if (recipe.length === 0) {
        return <Loading/>
    }
    return (
        <section className="container">
            <div className="recipe">
                <h1 className="recipe__title">{recipe.title}</h1>

                {recipe.description.lenght > 0 && <article className="recipe__description"><p>
                    {recipe.description}
                </p></article>}


                <ul className="recipe__switchBar">
                    <li className={flags.instructions ? "active" : "noActive"}
                        onClick={handleChangeFlags}>Instrukcje <span/></li>
                    <li className={flags.ingredients ? "active" : "noActive"}
                        onClick={handleChangeFlags}>Składniki<span/></li>
                </ul>
                <section className="recipe__container">
                    {flags.instructions && recipe.instructions.map((el, num) => < RecipeInstructions text={el}
                                                                                                     num={num}/>)}
                    {flags.ingredients && recipe.ingredients.map(el => <RecipeIngredients name={el.name}
                                                                                          amount={el.amount}
                                                                                          unit={el.unit}/>)}
                </section>
                <button
                    className={`recipe__editBtn recipe__editBtn--green ${animationClassEdit && "animatedRedirect--editForm"}`}
                    onClick={handleRedirectToEdit}>Edytuj
                     <span/></button>
                <button
                    className={`recipe__editBtn recipe__editBtn--red ${animationClassDelete && "animatedRedirect--editForm"}`}
                    onClick={handleDelete}>Usuń
                    <span/></button>
            </div>


            {redirectToEdit && <Redirect to={`/myRecipe/edit/${props.match.params.id}`}/>}
            {redirectToRecipes && <Redirect to="/myRecipes"/>}
        </section>
    )
}


const mapStateToProps = state => ({
    AllRecipes: state.recipes,
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(MyRecipeSingleRecipe)
