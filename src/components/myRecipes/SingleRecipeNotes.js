import { connect } from "react-redux"

const SingleRecipeNotes = ({recipe, recipeStyles}) => {
    const styles = {
        borderTop: `0.2em solid ${recipeStyles.colorSecondary}`
    }
    return <div className="recipeNotes">
       <p style={styles} className="recipeNotes__item">{recipe.notes}</p>
    </div>
}
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeNotes)