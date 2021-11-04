import { connect } from "react-redux";
import { changeDeleteRecipeFlagRDX } from "../../redux/actions/deleteRecipe.actions";
import { deleteDataFirestore } from "../../fireBase/deleteDataFirestore";
import { auth } from "../../fireBase/fireBase";

/**
 * Component with box to confirm deleting recipe
 * @param  recipe - REDUX STATE - data about specific recipe
 * @param  changeDeleteRecipeFlag - REDUX ACTION - function that changes deleteRecipeFlag 
 */
const SingleRecipeConfirmDelte = ({ recipe, changeDeleteRecipeFlag }) => {

    /** change redux state - deleteRecipeFlag - and return to recipe view, look in MyRecipeSingleRecipe component*/
    const handleReturnToRecipe = () => changeDeleteRecipeFlag(false);

    /** delete recipe from user's account in firestore - 'recipes' subcollection */
    const handleDeleteRecipe = () => {
        return deleteDataFirestore(recipe.id, auth().currentUser.uid, "recipes")
            .then(() => {
                // redirect user to list with the same type of deleted recipe
                window.location.replace(`/myRecipes/${recipe.type}`);
            });
    }
    return <div className='recipeDelete'>
        <div className="recipeDelete__item">
            {/* ask user if he really wants to delete recipe */}
            <h2 className="recipeDelete__title">Czy na pewno chcesz usunąć ten przepis?</h2>
            <div className="recipeDelete__buttonsWrapper">
                {/* delete recipe */}
                <button className="recipeDelete__btn recipeDelete__btn--delete" onClick={handleDeleteRecipe}>Usuń przepis</button>

                {/* dont delete, and show recipe view */}
                <button className="recipeDelete__btn recipeDelete__btn--cancel" onClick={handleReturnToRecipe}>Nie usuwaj</button>
            </div>
            <span />
        </div>
    </div>
}

// REDUX
const mapStateToProps = state => ({
    recipe: state.recipeData
});
const mapDispatchToProps = dispatch => ({
    changeDeleteRecipeFlag: boolean => dispatch(changeDeleteRecipeFlagRDX(boolean))
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeConfirmDelte);