import { connect } from "react-redux";
import { changeDeleteRecipeFlagRDX } from "../../redux/actions/deleteRecipe.actions";
import { deleteDataFirestore } from "../../fireBase/deleteDataFirestore";
import { auth } from "../../fireBase/fireBase";
const SingleRecipeConfirmDelte = ({recipe, changeDeleteRecipeFlag}) => {

    const recipeType = recipe.type;
    /** change redux state - deleteRecipeFlag - and return to recipe view */
    const handleReturnToRecipe = () => {
        return changeDeleteRecipeFlag(false);
    }
    
    /** delete recipe from user's account in firestore - 'recipes' subcollection */
    const handleDeleteRecipe = () => {
       return deleteDataFirestore(recipe.id, auth().currentUser.uid, "recipes")
       .then(()=> {
           // redirect user to list with the same type of deleted recipe
        window.location.replace(`/myRecipes/${recipeType}`)
       });
    }
    return <div className='recipeDelete'>
        <div className="recipeDelete__item">
               <h2  className="recipeDelete__title">Czy na pewno chcesz usunąć ten przepis ?</h2>
               <div className="recipeDelete__buttonsWrapper">
                    <button className="recipeDelete__btn recipeDelete__btn--delete" onClick={handleDeleteRecipe}>Usuń przepis</button>
                    <button className="recipeDelete__btn recipeDelete__btn--cancel" onClick={handleReturnToRecipe}>Nie usuwaj</button>
               </div>
               <span/>
        </div>
    </div>
}
const mapStateToProps = state => ({
    recipe: state.recipeData
})
const mapDispatchToProps = dispatch => ({
    changeDeleteRecipeFlag: boolean => dispatch(changeDeleteRecipeFlagRDX(boolean))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeConfirmDelte)