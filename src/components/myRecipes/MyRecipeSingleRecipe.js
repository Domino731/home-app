import { connect } from "react-redux";
import { useEffect } from "react";
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
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Component with content for single recipe
 * @param changeRecipeData - REDUX ACTION - that function is changing recipeData state in redux
 * @param changeRecipeStyles - REDUX ACTION - that function is changing recipeStyles state in redux
 * @param setToDos - REDUX ACTION - that function is changing ToDo state in redux
 * @param setProducts - REDUX ACTION - that function is changing products state in redux
 * @param deleteRecipeFlag - REDUX STATE - deleteRecipeFlag state in redux, needed to toggle between main content for recipe and container by which user can delete recipe
 * @param recipe - REDUX STATE - data about recipe
 * @param products - REDUX STATE - data about user's products
 * @param recipeStyles - REDUX STATE - data about styles for recipe
 * @param tasks - REDUX STATE - data about user's tasks
 */
const MyRecipeSingleRecipe = ({ changeRecipeData, changeRecipeStyles, setToDos, setProducts, deleteRecipeFlag, recipe, products, recipeStyles, tasks }) => {

    // references
    const { id } = useParams();

    /** recipe id (from route params) */
    const recipeId = id;

    // fetch data about specific recipe from firestore 
    useEffect(() => {
        return auth()
            .onAuthStateChanged(user => {
                if (user) {
                    // get recipe data, tasks and products data
                    // tasks - needed to check if user has add this recipe to his tasks in SingleRecipeHeader component (button text with background color will change)
                    // products - to check if user has required products for this recipe
                    return getRecipeData(user.uid, recipeId, changeRecipeData)
                        .then(() => getDataFromFirestore('ToDo', user.uid, setToDos))
                        .then(() => getDataFromFirestore('products', user.uid, setProducts))
                }
            });
    }, [recipeId]);

    // fetch data about styles of particular type of recipe (svg icon and color) 
    useEffect(() => {
       recipe && getRecipeStyles(recipe.type, changeRecipeStyles)
    }, [recipe]);




    // wait for data
    if (recipe === null || recipeStyles === null || tasks === null || products === null) {
        return <Loading />
    }

    return <main className="container container--withoutPadding">
        {/* check if use wants to delete recipe, he can change deleteRecipeFlag (redux state) in SingleRecipeContent -> SingleRecipeOptions nested component  */}
        {/* main content */}
        {!deleteRecipeFlag && <>
            <SingleRecipeHeader />
            <SingleRecipeOverview />
            <SingleRecipeContent />
        </>}
        {/* container with button by which user can delete recipe */}
        {deleteRecipeFlag && <SingleRecipeConfirmDelte />}
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
