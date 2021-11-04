//component that renders categories of recipes from firestore(collection recipesRendering)

//if you want to add a new category add to the firestore in the recipesRendering collection
// a new document with a title, path, and a number which defines where the category is located

import { useEffect, useState } from "react";
import { db } from "../../fireBase/fireBase";
import { Loading } from "../loading/Loading";
import { MyRecipesBar } from "./MyRecipesBar";
import { MyRecipeTypeRedirect } from "./MyRecipeTypeRedirect";
import background from "../../images/background_recipes_types.jpg";

/**
 * Component with all recipes types
 */
export const MyRecipes = () => {

    // array with available recipes types, needed to render links to list with recipes of particular type (by MyRecipeTypeRedirect  component)
    // if you want to add new type look at docs
    const [availableRecipesTypes, setAvailableRecipesTypes] = useState([]);

    // fetch available recipes types data
    useEffect(() => {
        return db.collection("recipesRendering").get().then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            // sort by 
            data.sort((a, b) => a.number - b.number)
            return setAvailableRecipesTypes(data)
        });
    }, [])

    if (availableRecipesTypes.length === 0) {
        return <Loading />
    }
    return (
        <section className="container recipes">

            <MyRecipesBar />

            {/* rendering links for earch type of recipe, if you want to add new type - everything is described in docs */}
            <div className="recipesType">
                {
                    availableRecipesTypes.map((el, num) => <MyRecipeTypeRedirect title={el.title} recipeType={el.path}
                        key={`recipe${num}`} />)
                }
            </div>

        </section>
    )
}