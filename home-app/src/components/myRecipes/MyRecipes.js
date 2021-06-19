import {MyRecipesBar} from "./MyRecipesBar";
import {MyRecipeRedirect} from "./MyRecipeRedirect";

export const MyRecipes = () => {
    return (
        <section className="container">
            <MyRecipesBar/>
            <div className="recipesType">
                <MyRecipeRedirect title={"Ciasta"} path="cakes"/>
                <MyRecipeRedirect title={"Desery"} path="desserts"/>
                <MyRecipeRedirect title={"Obiady"} path="dinners"/>
                <MyRecipeRedirect title={"Sałatki"} path="salads"/>
                <MyRecipeRedirect title={"Zupy"} path="soup"/>
                <MyRecipeRedirect title={"Na szybko"} path="fasts"/>
                <MyRecipeRedirect title={"Specjalne"} path="specials"/>
            </div>
        </section>
    )
}