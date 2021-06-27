//component that renders categories of recipes from firestore(collection recipesRendering)

//if you want to add a new category add to the firestore in the recipesRendering collection
// a new document with a title, path, and a number which defines where the category is located

import {useEffect, useState} from "react";
import {db} from "../../fireBase/fireBase";
import {Loading} from "../loading/Loading";
//components
import {MyRecipesBar} from "./MyRecipesBar";
import {MyRecipeRedirect} from "./MyRecipeRedirect";


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
        return <Loading/>
    }
    return (
        <section className="container recipes">
            <MyRecipesBar/>
            <div className="recipesType">

                {/*rendering redirects by renderingArray state*/}
                {
                    renderingArray.map((el, num) => <MyRecipeRedirect title={el.title} path={el.path}
                                                                      key={`recipe${num}`}/>)
                }


            </div>
        </section>
    )
}