import { connect } from "react-redux"

/**
 * Recipe ingredients list
 * @param recipe - REDUX STATE - data about recipe
 * @param recipeStyles - REDUX STATE - data about recipe styles - colors and icon (<svg> tag)
 */
const SingleRecipeIngredients = ({ recipe, recipeStyles }) => {

    /** styles - background color - primary color and box shadow */
    const styles = {
        backgroundColor: recipeStyles.colorPrimary,
        boxShadow: `0 0 0.2em ${recipeStyles.colorPrimary}, 
            0 0 1.3em ${recipeStyles.colorSecondary} inset`
    }
    // prod.name.toLowerCase() === el.name.toLowerCase()
    return <div className="recipeIngredients">
        {recipe.ingredients.map((el, num) => {
            return <div className="recipeIngredients__item" style={styles} key={`recipe-${recipe.title}-ingredient-${num}`}>

                {/* ingredient name */}
                <div className="recipeIngredients__name">{el.name}</div>

                {/* ingredient amount */}
                <div className="recipeIngredients__amount">
                    <strong>{el.amount} {el.unit}</strong>
                </div>
            </div>
        })}
    </div>
}

// REDUX
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeIngredients)
