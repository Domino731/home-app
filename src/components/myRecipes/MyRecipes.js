import { useEffect, useState } from "react";
import { db } from "../../fireBase/fireBase";
import { Loading } from "../loading/Loading";
import { MyRecipesHeader } from "./MyRecipesHeader";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
/**
 * Component with recipes types list
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

            // sort by a number that specify priority
            data.sort((a, b) => a.number - b.number)

            // save new data
            return setAvailableRecipesTypes(data);
        });
    }, [])

    // wait for data
    if (availableRecipesTypes.length === 0) {
        return <Loading />
    }

    return <main className="container recipes">

        {/* header */}
        <MyRecipesHeader />

        {/* rendering links for each type of recipe, if you want to add new type - everything is described in docs */}
        <div className="recipesType">
            {
                availableRecipesTypes.map((el, num) => <Link to={`/myRecipes/${el.path}`} className='recipeRedirect' key={`recipe-redirect-${el.path}-${num}`}>
                <span />
                <strong> {el.title} </strong>
            </Link>)
            }
        </div>

    </main>

}