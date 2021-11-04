import { connect } from "react-redux";
import { changeDeleteRecipeFlagRDX } from "../../redux/actions/deleteRecipe.actions";

/**
 * Component with options for recipe - edit or delete recipe
 * @param recipe - REDUX STATE - data about recipe
 * @param changeDeleteFlag - REDUX ACTION - function that changes deleteRecipeFlag 
 */
const SingleRecipeOptions = ({ recipeStyles, changeDeleteFlag }) => {

    /** styles - background with secondary color and the box shadow */
    const editbtnStyles = {
        background: recipeStyles.colorSecondary,
        boxShadow: `0 0 0.1em ${recipeStyles.colorPrimary},
         0 0 1em ${recipeStyles.colorPrimary} inset
         `
    }

    return <div className="recipeOptions">
        {/* delete recipe */}
        <button onClick={() => changeDeleteFlag(true)} className="recipeOptions__btn recipeOptions__btn--delete" >Usuń przepis</button>

        {/* edit recipe */}
        <button className="recipeOptions__btn " style={editbtnStyles}>Edytuj przepis</button>
    </div>
}

// REDUX
const mapDispatchToProps = dispatch => ({
    changeDeleteFlag: Boolean => dispatch(changeDeleteRecipeFlagRDX(Boolean))
})
const mapStateToProps = state => ({
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeOptions)