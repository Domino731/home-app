import { connect } from "react-redux";

/**
 * Notes of recipe
 * @param recipe - REDUX STATE - data about recipe
 * @param recipeStyles - REDUX STATE - data about recipe styles - colors and icon (<svg> tag)
 */
const SingleRecipeNotes = ({recipe, recipeStyles}) => {

    /** styles - border top with secondary color */
    const styles = {
        borderTop: `0.2em solid ${recipeStyles.colorSecondary}`
    }

    return <div className="recipeNotes">
       <p style={styles} className="recipeNotes__item">{recipe.notes}</p>
    </div>
}

// REDUX
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeNotes)