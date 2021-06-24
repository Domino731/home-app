import {getCategoryText} from "../../functions/getCategoryText";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import MyRecipeBox from "./MyRecipeBox";
import {Loading} from "../loading/Loading";
import {db} from "../../fireBase/fireBase";
import {sortingByAlphabeticalRecipes} from "../../functions/sorting";
import {renderByFirebase} from "../../functions/renderByFirebase";

const MyRecipesList = (props) => {

    const [animationClass, setAnimationClass] = useState(false)
    const [flag, setFlag] = useState(false)
    const [recipesArray, setRecipesArray] = useState(null)
    const [recipesCategory, setRecipesCategory] = useState("")
    const [sorting, setSorting] = useState("Alfabetycznie A - Z")
    useEffect(() => {
        if (props.recipes !== null) {
            setRecipesArray(props.recipes.filter(el => el.type === props.match.params.type))
                sortingByAlphabeticalRecipes(sorting, setRecipesArray)
            console.log(recipesArray)
        }
        renderByFirebase("recipesRendering", setRecipesCategory)

    }, [props.recipes, sorting])
    const handleChangeSorting = () => {
        if (sorting === "Alfabetycznie Z - A") {
            setSorting("Alfabetycznie A - Z")
        } else {
            console.log(true)
            setSorting("Alfabetycznie Z - A")
        }
    }
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(() => {
            setFlag(true)
        }, 700)
    }
    if (recipesArray === null) {
        return <Loading/>
    } else if (recipesCategory.includes(props.match.params.type)) {
        return (
            <section className="container recipes">
                <div className="titleBar recipesListBar">
                    <h2>Dodaj Przepis</h2>
                    <strong>W kategorii <i>{getCategoryText(props.match.params.type)}</i></strong>
                </div>
                <button className={`addRecipeBtn ${animationClass && "addRecipeBtn__animation"}`} onClick={redirect}>
                    <i className="fas fa-plus"/>
                </button>

                {recipesArray.length === 0 &&
                <strong className="emptyRecipes">brak przepisów w
                    kategorii <br/>{getCategoryText(props.match.params.type)} <i
                        className="fas fa-heart-broken"/></strong>
                }
                {recipesArray.length > 0 &&

                <section className="recipesList">
                    <div className="sort sort--green" onClick={handleChangeSorting}>
                        <button>{sorting}</button>
                    </div>
                    {recipesArray.map(el => {
                        return <MyRecipeBox recipe={el} key={el.id}/>
                    })}
                </section>
                }
                {flag && <Redirect to={`/myRecipes/${props.match.params.type}/add`}/>}
            </section>

        )
    } else if (recipesCategory.includes(props.match.params.type) === false) {
        return null
    }

}


const mapStateToProps = state => (
    {
        recipes: state.recipes
    }
)
export default connect(mapStateToProps)(MyRecipesList)