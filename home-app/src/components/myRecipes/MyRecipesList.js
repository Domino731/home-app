import {getCategoryText} from "../../functions/getCategoryText";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import MyRecipeBox from "./MyRecipeBox";
import {Loading} from "../loading/Loading";
import {db} from "../../fireBase/fireBase";

const MyRecipesList = (props) => {

    const [animationClass, setAnimationClass] = useState(false)
    const [flag, setFlag] = useState(false)
    const [recipesArray, setRecipesArray] = useState(null)
    const [recipesCategory, setRecipesCategory] = useState("")
    useEffect(() => {
        if (props.recipes !== null) {
            setRecipesArray(props.recipes.filter(el => el.type === props.match.params.type))
        }
        db.collection("recipesRendering").get().then((querySnapshot) => {
            let arr = []
            querySnapshot.docs.map(doc => (
                arr.push(doc.data().path)
            ));
            console.log(arr)
            console.log(props.match.params.type)
            setRecipesCategory(arr)
        });

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
    else if(recipesCategory.includes(props.match.params.type)) {
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
                        return <MyRecipeBox recipe={el} key={el.id}/>
                    })}
                </section>
                }
                {flag && <Redirect to={`/myRecipes/${props.match.params.type}/add`}/>}
            </section>

        )
    }
    else if(recipesCategory.includes(props.match.params.type) === false){
        return <div className="noMatch">Brak kategorii  <br/>
          <strong>{props.match.params.type}</strong>
        </div>
    }

}


const mapStateToProps = state => (
    {
        recipes: state.recipes
    }
)
export default connect(mapStateToProps)(MyRecipesList)