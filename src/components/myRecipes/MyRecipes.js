//component that renders categories of recipes from firestore(collection recipesRendering)

//if you want to add a new category add to the firestore in the recipesRendering collection
// a new document with a title, path, and a number which defines where the category is located

import { useEffect, useState } from "react";
import { db } from "../../fireBase/fireBase";
import { Loading } from "../loading/Loading";
import { MyRecipesBar } from "./MyRecipesBar";
import { MyRecipeRedirect } from "./MyRecipeRedirect";
import background from "../../images/background_recipes_types.jpg";

export const MyRecipes = () => {

    //state with array from firestore,is used to rendering redirect for specific type for recipes
    const [renderingArray, setRenderingArray] = useState([])

    //when component mount get products form firestore and push them into renderingArray state
    useEffect(() => {
        db.collection("recipesRendering").get().then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setRenderingArray(data.sort((a, b) => a.number - b.number))
            return data
        });
    }, [])


    if (renderingArray.length === undefined) {
        return null
    }
    if (renderingArray.length === 0) {
        return <Loading />
    }
    return (
        <section className="container recipes">

            <style>{`body {
            background-image: url(${background})} 
            `}</style>

            <MyRecipesBar />

            {/* rendering links for earch type of recipe, if you want to add new type - everything is described in docs */}
            <div className="recipesType">
                {
                    renderingArray.map((el, num) => <MyRecipeRedirect title={el.title} path={el.path}
                        key={`recipe${num}`} />)
                }
            </div>

            <div className="freepik">
                <a href='https://www.freepik.com/photos/food'>Food photo created by freepik - www.freepik.com</a>
            </div>

        </section>
    )
}