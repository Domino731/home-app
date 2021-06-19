import {getCategoryText} from "../../functions/getCategoryText";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import MyRecipeBox from "./MyRecipeBox";
import {Loading} from "../loading/Loading";

const MyRecipesList = (props) => {
    const [animationClass, setAnimationClass] = useState(false)
    const [flag, setFlag] = useState(false)
    const [recipesArray, setRecipesArray] = useState(null)
    useEffect(() => {
        if (props.recipes !== null) {
            setRecipesArray(props.recipes.filter(el => el.type === props.match.params.type))
        }
        console.log(recipesArray)
    }, [props.recipes])
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(() => {
            setFlag(true)
        }, 700)
    }
    if (recipesArray === null) {
        return <Loading/>
    }
    else {
        return (
            <section className="container">
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
                  <section>
                      {recipesArray.map(el => {
                          return <MyRecipeBox recipe={el}/>
                      })}
                  </section>
                }

                {flag && <Redirect to={`/myRecipes/${props.match.params.type}/add`}/>}
            </section>

        )
    }

}


const mapStateToProps = state => (
    {
        recipes: state.recipes
    }
)
export default connect(mapStateToProps)(MyRecipesList)