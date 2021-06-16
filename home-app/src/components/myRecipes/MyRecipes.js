import {MyRecipesBar} from "./MyRecipesBar";
import {MyRecipeBox} from "./MyRecipeBox";

export const MyRecipes = () => {
    return (
        <section className="container">
            <MyRecipesBar/>
            <div className="recipesType">
                <MyRecipeBox title={"Ciasta"} path="/cakes"/>
                <MyRecipeBox title={"Desery"} path="/desserts"/>
                <MyRecipeBox title={"Obiady"} path="/dinners"/>
                <MyRecipeBox title={"Sałatki"} path="/salads"/>
                <MyRecipeBox title={"Zupy"} path="/soup"/>
                <MyRecipeBox title={"Na szybko"} path="/fasts"/>
                <MyRecipeBox title={"Specjalne"} path="/specials"/>
            </div>
        </section>
    )
}