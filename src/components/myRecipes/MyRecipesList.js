import { useEffect, useState } from "react";
import { Loading } from "../loading/Loading";
import MyRecipeBox from "./MyRecipeBox";
import { auth } from "../../fireBase/fireBase";
import { getRecipesOfParticularType } from "../../fireBase/getRecipesOfParticularType";
import { Redirect, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { db } from "../../fireBase/fireBase";
/**
 * Component with all recipes about particular type
 */
const MyRecipesList = () => {

    // references
    const { type } = useParams();
    const history = useHistory();

    /** type of recipes from url parama */
    const recipesType = type;

    // flag to overlay animation on add new recipe button
    const [animationClass, setAnimationClass] = useState(false);

    // sorting option
    const [sorting, setSorting] = useState("Alfabetycznie A - Z");

    // array with data about recipes
    const [recipesData, setRecipesData] = useState(null);

    // state with name of current type of recipe (in polish)
    const [typeNamePl, setTypeNamePl] = useState('');

    // array with available types of recipes, needed to check if url param (which is recipe type) is included in this array,
    // if no then redirect user to list all recipes types list - /myRecipes. If you want to add new type recipe look at docs
    const [availableRecipesTypes, setAvailableRecipesTypes] = useState(null);

    // fetch available recipes types from firestore ('recipesRendering') collection
    useEffect(() => {
        return db.collection("recipesRendering").get().then((querySnapshot) => {
            const data = [];
            querySnapshot.docs.map(doc => {
                data.push(doc.data().path);
                doc.data().path === recipesType && setTypeNamePl(doc.data().title)  
            });

            // save new data
            return setAvailableRecipesTypes(data);
        });
    }, [recipesData]);


    // fetch data about recipes of particular type
    useEffect(() => {
        return auth().onAuthStateChanged(user => {
            user && getRecipesOfParticularType(recipesType, user.uid, setRecipesData);
        });
    }, [recipesType]);

    // listen for sorting state changes, then sort recipes by selecting option - sorting state
    useEffect(() => {
        recipesData && sortingByAlphabeticalRecipes(sorting);
    }, [sorting]);


    /**
     * That function is sorting array with recipes alphabetically
      * @param  {"Alfabetycznie Z - A" | "Alfabetycznie Z - A"} option - sorting option ->  A - Z or Z - A
      * @param {*} set - function with component state
    */
    const sortingByAlphabeticalRecipes = (option) => {
        if (option === "Alfabetycznie Z - A") {
            return setRecipesData(prev => prev.sort((a, b) => {
                const textA = a.title.toUpperCase();
                const textB = b.title.toUpperCase();
                return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
            }));
        } else {
            return setRecipesData(prev => prev.sort((a, b) => {
                const textA = a.title.toUpperCase();
                const textB = b.title.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }));
        }
    }

    /** function that changes the sorting state -> useEffect() hook will sort array with recipes (recipesData state) */
    const handleChangeSorting = () => {
        sorting === "Alfabetycznie Z - A" ? setSorting("Alfabetycznie A - Z") : setSorting("Alfabetycznie Z - A")
    }

    /** function that is appling animation on button and after 0.7s redirects user to form where he can add new recipe */
    const redirect = () => {
        // change state -> apply animation
        setAnimationClass(true);

        // redirect user after delay
        return setTimeout(() => {
            history.push(`/myRecipes/${recipesType}/add`);
        }, 700);
    }

    if (!recipesData || !availableRecipesTypes) {
        return <Loading />
    }

    //if the specified type of recipe does not exist in the firestore, redirect user to page with all recipe types
    else if (availableRecipesTypes && !availableRecipesTypes.includes(recipesType)) {
        return <Redirect to='/myRecipes' />

    }

    return (
        <main className="container container--recipesList">

            {/* header */}
            <header className="recipesListHeader">
                <h2>Twoje przepisy</h2>
                <strong>W kategorii <i>'{typeNamePl}'</i></strong>
            </header>

            {/* if you click on this button it will redirect you to new recipe form (after delay)*/}
            <button className={`addRecipeBtn ${animationClass && "addRecipeBtn__animation"}`} onClick={redirect} title='Dodaj nowy przepis'>
                <i className="fas fa-plus" />
            </button>

            {/* if user doesnt have any recipes then inform him about this */}
            {recipesData.length === 0 &&
                <strong className="emptyRecipes">Brak przepisów w
                    kategorii <br/>'{typeNamePl}' <i
                        className="fas fa-heart-broken" /></strong>
            }

            {/*if user has one recipe at least */}
            {recipesData.length > 0 &&
                <section>
                    
                    {/* button by which user can sort recipes alphabetically */}
                    <div className="sort sort--green" onClick={handleChangeSorting}>
                        <button>{sorting}</button>
                    </div>

                     {/* list with all user's recipes */}
                    <ul className="recipesList">
                        {/*render elements which, when clicked, redirect you to a specific recipe*/}
                        {recipesData.map(el => {
                            return <MyRecipeBox recipe={el} key={el.id} />
                        })}
                    </ul>

                </section>
            }

        </main>

    );
}


export default MyRecipesList