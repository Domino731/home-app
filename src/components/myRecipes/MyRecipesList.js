//component containing a list of all the recipes of a certain type

import { useHistory } from "react-router-dom";
import { getCategoryText } from "../../functions/getCategoryText";
import { useEffect, useState } from "react";
import { sortingByAlphabeticalRecipes } from "../../functions/sorting";
import { renderByFirebase } from "../../fireBase/renderByFirebase";
import { Loading } from "../loading/Loading";
import MyRecipeBox from "./MyRecipeBox";
import { auth } from "../../fireBase/fireBase";
import { getRecipesOfParticularType } from "../../fireBase/getRecipesOfParticularType";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { db } from "../../fireBase/fireBase";
const MyRecipesList = (props) => {

    const { type } = useParams();
    const history = useHistory();

    //flag to overlay animation
    const [animationClass, setAnimationClass] = useState(false)

    // an array to check if a given recipe type is in the firestore
    const [recipesCategory, setRecipesCategory] = useState([])

    //sorting recipes alphabetically
    const [sorting, setSorting] = useState("Alfabetycznie A - Z")

    const [recipesData, setRecipesData] = useState(null)

    const [availableRecipesTypes, setAvailableRecipesTypes] = useState([]);

    //getting recipes form application store by type, and sorting them alphabetically
    useEffect(() => {
        return db.collection("recipesRendering").get().then((querySnapshot) => {
            const data = [];
            querySnapshot.docs.map(doc => {
               data.push(doc.data().path) 
            });
             return setAvailableRecipesTypes(data)
        });
    }, [])

    // useEffect(() => {
    //     if (props.recipes !== null) {
    //         setRecipesArray(props.recipes.filter(el => el.type === props.match.params.type))

    //         //sorting
    //         sortingByAlphabeticalRecipes(sorting, setRecipesArray)
    //     }
    // }, [sorting]);

    // fetch data about recipes of particular type
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setRecipesData([])
               // getRecipesOfParticularType(props.match.params.type, user.uid, setRecipesData);
            }
        });
    }, [props.match.params.type]);

    //function that changes the sorting
    const handleChangeSorting = () => {
        sorting === "Alfabetycznie Z - A" ? setSorting("Alfabetycznie A - Z") : setSorting("Alfabetycznie Z - A")
    }

    //function that set the animation on button and, redirect to new recipe form
    const redirect = () => {
        setAnimationClass(true)
        setTimeout(() => {
            history.push(`/myRecipes/${props.match.params.type}/add`);
        }, 700);
    }

    if (!recipesData || !availableRecipesTypes) {
        return <Loading />
    }

    //if the specified category does not exist in the firestore, return null
    else if (!availableRecipesTypes.includes(props.match.params.type)) {
        return null

    }
        return (
            <section className="container recipes">
                <header className="recipesListHeader">
                    <h2>Twoje przepisy</h2>
                    <strong>W kategorii <i>'{props.match.params.type}'</i></strong>
                </header>

                {/*if you click on this button it will redirect you to new recipe form*/}
                <button className={`addRecipeBtn ${animationClass && "addRecipeBtn__animation"}`} onClick={redirect}>
                    <i className="fas fa-plus" />
                </button>

                {/*if you do not have any rules, display information about it*/}
                {recipesData.length === 0 &&
                    <strong className="emptyRecipes">Brak przepisów w
                        kategorii <br />'{props.match.params.type}'<i
                            className="fas fa-heart-broken" /></strong>
                }

                {/*if you have recipes */}
                {recipesData.length > 0 && `as`
                    // <section>
                    //     <div className="sort sort--green" onClick={handleChangeSorting}>
                    //         <button>{sorting}</button>
                    //     </div>
                    //     <ul className="recipesList">

                    //         {/*render elements which, when clicked, redirect you to a specific recipe*/}
                    //         {recipesData.map(el => {
                    //            return <MyRecipeBox recipe={el} key={el.id} />
                    //         })}
                    //     </ul>
                    // </section>
                }

            </section>

        );
}


export default MyRecipesList