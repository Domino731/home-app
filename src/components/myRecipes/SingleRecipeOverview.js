import { connect } from "react-redux"

/**
 * Component with recipe overview - title, description, kcal, prepare time, serving weight
 * @param recipe - REDUX STATE - data about recipe
 * @param changeDeleteFlag - REDUX ACTION - function that changes deleteRecipeFlag  
 */
const SingleRecipeOverview = ({ recipe, recipeStyles }) => {

    /** styles - primary color for font */
    const colorPrimary = {
        color: recipeStyles.colorPrimary
    }
    return <section className="recipe__item recipeOverview">
         {/* title */}
        <h2 className="recipeOverview__title">{recipe.title}</h2>

        {/* general - weight for 1 serving and kcal */}
        <div className="recipeOverview__topBar">
            {recipe.servingWeight && <div title='Jedna porcja'>{recipe.servingWeight}G  &nbsp;</div>}
            {(recipe.servingWeight && recipe.kcal) && <i className="fas fa-circle" style={colorPrimary} />}
            {recipe.kcal && <div title='Jedna porcja'>&nbsp; {recipe.kcal} Kcal </div>}
        </div>

        {/* description */}
        <p className="recipeOverview__description">{recipe.description}</p>
        <div className="recipeOverview__botBar">
            {recipe.prepareTime && <div className="recipeOverview__box">
                <div style={colorPrimary}>{recipe.prepareTime}</div>
                <div>MIN</div>
            </div>}
            <div className={`recipeOverview__box ${(recipe.prepareTime && recipe.kcal) ? `recipeOverview__box--mid` : ``}`}>
                <div style={colorPrimary}>{recipe.ingredients.length}</div>
                <div>Ilość Składników</div>
            </div>
            {recipe.kcal &&  <div className="recipeOverview__box">
            <div style={colorPrimary}>{recipe.kcal}</div>
                <div>Kcal</div>
                 </div>}
        </div>
    </section>
}

// REDUX 
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeOverview)