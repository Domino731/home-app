//component responsible for a single recipe
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {useHistory, Redirect} from "react-router-dom";
import {deleteDataFirestore} from "../../fireBase/deleteDataFirestore";
//components
import {Loading} from "../loading/Loading";
import {RecipeInstructions} from "./SingleRecipe--RecipeInstructions";
import {RecipeIngredients} from "./SingleRecipe--RecipeIngredient";


// props //
// AllRecipes --> all recipes from application store
// id --> to get a specific recipe, and delete him in deleteDataFirestore
// username --> to delete recipe in deleteDataFirestore
const MyRecipeSingleRecipe = (props) => {

    //state holding the whole recipe
    const [recipe, setRecipe] = useState([])

    // object which is contains flags to display the specific element
    // instruction -> show recipe instruction
    // ingredients-> show recipe ingredients
    const [flags, setFlags] = useState({instructions: true, ingredients: false})


    // flag  which makes it possible to redirect to Recipes after delete a recipe
    const [redirectToRecipes, setRedirectToRecipes] = useState(false)

    //flag to overlay animation
    const [animationClassEdit, setAnimationClassEdit] = useState(false)

    //flag to overlay animation
    const [animationClassDelete, setAnimationClassDelete] = useState(false)

    const history = useHistory()
    //getting a recipe with a specific id
    useEffect(() => {
        if (props.AllRecipes !== null) {
            setRecipe(props.AllRecipes.filter(el => el.id === props.match.params.id))
            setRecipe(prev => prev[0])
        }
    }, [props])


    // function that changing flags, which is displaying the instructions or ingredients
    const handleChangeFlags = () => {
        if (flags.instructions) {
            setFlags({instructions: false, ingredients: true})
        } else {
            setFlags({instructions: true, ingredients: false})
        }
    }

    // function that set the animation and redirect to edit recipe
    const handleRedirectToEdit = () => {
        setAnimationClassEdit(true)
        setTimeout(() => {
            history.push(`/myRecipe/edit/${props.match.params.id}`)
        }, 1700)
    }

    // function that delete the specific recipe
    const handleDelete = () => {
        setAnimationClassDelete(true)
        setTimeout(() => {
            deleteDataFirestore(props.match.params.id, props.username, "recipes")
            setRedirectToRecipes(true)
        }, 1700)
    }
    if (recipe === undefined) {
        return null
    }
    if (recipe.length === 0) {
        return <Loading/>
    }
    return (
        <section className="container">
            <div className="recipe">
                <h1 className="recipe__title">{recipe.title}</h1>

                {/*if user add description then show it*/}
                {recipe.description.lenght > 0 && <article className="recipe__description"><p>
                    {recipe.description}
                </p></article>}

                {/*switching between instructions or ingredients*/}
                <ul className="recipe__switchBar">

                    {/*when it is active show corners*/}
                    <li className={flags.instructions ? "active" : "noActive"}
                        onClick={handleChangeFlags}>Instrukcje <span/></li>
                    <li className={flags.ingredients ? "active" : "noActive"}
                        onClick={handleChangeFlags}>Składniki<span/></li>

                </ul>
                <ul className="recipe__container">

                    {/*rendering instructions*/}
                    {flags.instructions && recipe.instructions.map((el, num) => < RecipeInstructions text={el}
                                                                                                     key={`${recipe.name}--instruction${el}`}
                                                                                                     num={num}/>)}

                    {/*rendering ingredients*/}
                    {flags.ingredients && recipe.ingredients.map(el => <RecipeIngredients name={el.name}
                                                                                          key={`${recipe.name}--ingredient${el}`}
                                                                                          amount={el.amount}
                                                                                          unit={el.unit}/>)}
                </ul>

                {/*redirect to edit form*/}
                <button
                    className={`recipe__editBtn recipe__editBtn--green ${animationClassEdit && "animatedRedirect--editForm"}`}
                    onClick={handleRedirectToEdit}>Edytuj
                    <span/></button>

                {/*delete and redirect to recipes */}
                <button
                    className={`recipe__editBtn recipe__editBtn--red ${animationClassDelete && "animatedRedirect--editForm"}`}
                    onClick={handleDelete}>Usuń
                    <span/></button>
            </div>


            {/* when you delete recipe - redirect to recipes */}
            {redirectToRecipes && <Redirect to="/myRecipes"/>}
        </section>
    )
}

//all the recipes that and then the one with a specific id is returned
// username so as to delete recipe in deleteDataFirestore
const mapStateToProps = state => ({
    AllRecipes: state.recipes,
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(MyRecipeSingleRecipe)
