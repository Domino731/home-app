import {MyRecipesBar} from "./MyRecipesBar";
import {MyRecipeRedirect} from "./MyRecipeRedirect";
import {useEffect, useState} from "react";
import {db} from "../../fireBase/fireBase";
import {Loading} from "../loading/Loading";

export const MyRecipes = () => {
    const [renderingArray, setRenderingArray] = useState([])
    useEffect(() => {
        db.collection("productsRendering").get().then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setRenderingArray(data.sort((a,b) => a.number - b.number ))
        });
    }, [])
    if(renderingArray.length === undefined){
        return null
    }
    if(renderingArray.length === 0){
        return <Loading/>
    }
    return (
        <section className="container">
            <MyRecipesBar/>
            <div className="recipesType">
                {
                    renderingArray.map(el => <MyRecipeRedirect title={el.title} path={el.path}/> )
                }
            </div>
        </section>
    )
}
// {/*<MyRecipeRedirect title={"Ciasta"} path="cakes"/>*/}
// {/*<MyRecipeRedirect title={"Desery"} path="desserts"/>*/}
// {/*<MyRecipeRedirect title={"Obiady"} path="dinners"/>*/}
// {/*<MyRecipeRedirect title={"Sałatki"} path="salads"/>*/}
// {/*<MyRecipeRedirect title={"Zupy"} path="soup"/>*/}
// {/*<MyRecipeRedirect title={"Na szybko"} path="fasts"/>*/}
// {/*<MyRecipeRedirect title={"Specjalne"} path="specials"/>*/}