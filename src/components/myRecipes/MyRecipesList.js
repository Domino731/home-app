//component containing a list of all the recipes of a certain type

import { useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {getCategoryText} from "../../functions/getCategoryText";
import {useEffect, useState} from "react";
import {sortingByAlphabeticalRecipes} from "../../functions/sorting";
import {renderByFirebase} from "../../fireBase/renderByFirebase";
//components
import {Loading} from "../loading/Loading";
import MyRecipeBox from "./MyRecipeBox";


const MyRecipesList = (props) => {

    //flag to overlay animation
    const [animationClass, setAnimationClass] = useState(false)

    // array with recipes, she's rendering MyRecipeBox components
    const [recipesArray, setRecipesArray] = useState(null)

    // an array to check if a given recipe type is in the firestore
    const [recipesCategory, setRecipesCategory] = useState("")

    //sorting recipes alphabetically
    const [sorting, setSorting] = useState("Alfabetycznie A - Z")

    const history = useHistory()
    //getting recipes form application store by type, and sorting them alphabetically
    useEffect(() => {
        if (props.recipes !== null) {
            setRecipesArray(props.recipes.filter(el => el.type === props.match.params.type))

            //sorting
            sortingByAlphabeticalRecipes(sorting, setRecipesArray)
        }
        renderByFirebase("recipesRendering", setRecipesCategory)

    }, [props.recipes, sorting])

    //function that changes the sorting
    const handleChangeSorting = () => {
        if (sorting === "Alfabetycznie Z - A") {
            setSorting("Alfabetycznie A - Z")
        } else {
            console.log(true)
            setSorting("Alfabetycznie Z - A")
        }
    }

    //function that set the animation on button and, redirect to new recipe form
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(() => {
            history.push(`/myRecipes/${props.match.params.type}/add`);
        }, 700)
    }

    if (recipesArray === null) {
        return <Loading/>

    }

    //if the specified category does not exist in the firestore, return null
    else if (recipesCategory.includes(props.match.params.type) === false) {
        return null

    } else if (recipesCategory.includes(props.match.params.type)) {
        return (
            <section className="container recipes">
                <div className="titleBar recipesListBar">
                    <h2>Dodaj Przepis</h2>
                    <strong>W kategorii <i>{getCategoryText(props.match.params.type)}</i></strong>
                </div>

                {/*if you click on this button it will redirect you to new recipe form*/}
                <button className={`addRecipeBtn ${animationClass && "addRecipeBtn__animation"}`} onClick={redirect}>
                    <i className="fas fa-plus"/>
                </button>

                {/*if you do not have any rules, display information about it*/}
                {recipesArray.length === 0 &&
                <strong className="emptyRecipes">brak przepisów w
                    kategorii <br/>{getCategoryText(props.match.params.type)} <i
                        className="fas fa-heart-broken"/></strong>
                }

                {/*if you have recipes */}
                {recipesArray.length > 0 &&

                <section className="recipesList">
                    <div className="sort sort--green" onClick={handleChangeSorting}>
                        <button>{sorting}</button>
                    </div>
                    <ul>

                        {/*render elements which, when clicked, redirect you to a specific recipe*/}
                        {recipesArray.map(el => {
                            return <MyRecipeBox recipe={el} key={el.id}/>
                        })}
                    </ul>
                </section>
                }
            </section>

        )
    }
}

//recipe that are filtered by the type
const mapStateToProps = state => (
    {
        recipes: state.recipes
    }
)
export default connect(mapStateToProps)(MyRecipesList)