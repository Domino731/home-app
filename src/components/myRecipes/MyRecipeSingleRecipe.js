import { connect } from "react-redux";
import { useEffect} from "react";
import { Loading } from "../loading/Loading";
import { getRecipeData } from "../../fireBase/getRecipeData";
import { auth } from "../../fireBase/fireBase";
import { changeRecipeDataRDX } from "../../redux/actions/recipeData.actions";
import { changeRecipeStylesRDX } from "../../redux/actions/recipeStyles.actions";
import { getRecipeStyles } from "../../fireBase/getRecipeStyles";
import SingleRecipeHeader from "./SingleRecipeHeader";
import { setToDos } from "../../redux/actions/firebaseData.actions";
import { getDataFromFirestore } from "../../fireBase/getDataFromFirestore";
import SingleRecipeOverview from "./SingleRecipeOverview";
import SingleRecipeContent from "./SingleRecipeContent";
import { setProducts } from "../../redux/actions/firebaseData.actions";
import SingleRecipeConfirmDelte from "./SingleRecipeConfirmDelte";

/**
 * component with content for specifi recipe
 */
const MyRecipeSingleRecipe = (props) => {

    // fetch data about specific recipe from firestore 
    useEffect(() => {
        return auth()
            .onAuthStateChanged(user => {
                if (user) {
                    // get recipe data, tasks and products data
                    // tasks - needed to check if user has add this recipe to his tasks in SingleRecipeHeader component (button text with background will change)
                    // products - to check if user has products for this recipe
                    return getRecipeData(user.uid, props.match.params.id, props.changeRecipeData)
                        .then(() => getDataFromFirestore('ToDo', user.uid, props.setToDos))
                        .then(()=> getDataFromFirestore('products', user.uid, props.setProducts))
                }
            });
    }, [props.match.params.id]);

    // fetch data about styles of particular type of recipe (svg icon and color) 
    useEffect(() => {
        props.recipe && getRecipeStyles(props.recipe.type, props.changeRecipeStyles)
    }, [props.recipe]);

    // wait for data
    if (props.recipe === null || props.recipeStyles === null || props.tasks === null || props.products === null) {
        return <Loading />
    }

    return <main className="container container--singleRecipe">
        {/* check if use wants to delete recipe, he can change deleteRecipeFlag (redux state) in SingleRecipeContent -> SingleRecipeOptions nested component  */}
        {/* main content */}
        {!props.deleteRecipeFlag && <> 
        <SingleRecipeHeader />
        <SingleRecipeOverview />
        <SingleRecipeContent/>
        </>}
        {/* container with button by which user can delete recipe */}
        {props.deleteRecipeFlag && <SingleRecipeConfirmDelte/>}
    </main>
}

// REDUX
const mapDispatchToProps = dispatch => ({
    changeRecipeData: data => dispatch(changeRecipeDataRDX(data)),
    changeRecipeStyles: data => dispatch(changeRecipeStylesRDX(data)),
    setToDos: data => dispatch(setToDos(data)),
    setProducts: data => dispatch(setProducts(data)),
})
const mapStateToProps = state => ({
    deleteRecipeFlag: state.deleteRecipeFlag,
    recipe: state.recipeData,
    products: state.products,
    recipeStyles: state.recipeStyles,
    tasks: state.toDo
})
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipeSingleRecipe)
