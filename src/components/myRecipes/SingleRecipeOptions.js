import { connect } from "react-redux"

 const SingleRecipeOptions = ({recipeStyles}) => {
     const editbtnStyles = {
         background: recipeStyles.colorSecondary,
         boxShadow: `0 0 0.1em ${recipeStyles.colorPrimary},
         0 0 1em ${recipeStyles.colorPrimary} inset
         `
     }
    return <div className="recipeOptions"> 
           <button className="recipeOptions__btn recipeOptions__btn--delete">Usuń przepis</button>
           <button className="recipeOptions__btn " style={editbtnStyles}>Edytuj przepis</button>
    </div>
}
const mapStateToProps = state => ({
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeOptions)