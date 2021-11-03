import { connect } from "react-redux"
import { changeDeleteRecipeFlagRDX } from "../../redux/actions/deleteRecipe.actions"
 const SingleRecipeOptions = ({recipeStyles, changeDeleteFlag}) => {
     const editbtnStyles = {
         background: recipeStyles.colorSecondary,
         boxShadow: `0 0 0.1em ${recipeStyles.colorPrimary},
         0 0 1em ${recipeStyles.colorPrimary} inset
         `
     }

    return <div className="recipeOptions"> 
           <button onClick={() => changeDeleteFlag(true)} className="recipeOptions__btn recipeOptions__btn--delete" >Usuń przepis</button>
           <button className="recipeOptions__btn " style={editbtnStyles}>Edytuj przepis</button>
    </div>
}
const mapDispatchToProps = dispatch => ({
   changeDeleteFlag: Boolean => dispatch(changeDeleteRecipeFlagRDX(Boolean))
})
const mapStateToProps = state => ({
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeOptions)