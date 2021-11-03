import { connect } from "react-redux"

const SingleRecipeOverview = ({ recipe, recipeStyles }) => {

    const colorPrimary = {
        color: recipeStyles.colorPrimary
    }
    return <section className="recipe__item recipeOverview">
        <h2 className="recipeOverview__title">{recipe.title}</h2>
        <div className="recipeOverview__topBar">
            {recipe.servingWeight && <div title='Jedna porcja'>{recipe.servingWeight}G  &nbsp;</div>}
            {(recipe.servingWeight && recipe.kcal) && <i className="fas fa-circle" style={colorPrimary} />}
            {recipe.kcal && <div title='Jedna porcja'>&nbsp; {recipe.kcal} Kcal </div>}
        </div>
        <p className="recipeOverview__description">{recipe.description}</p>
        <div className="recipeOverview__botBar">
            {recipe.prepareTime && <div className="recipeOverview__box">
                <div style={colorPrimary}>{recipe.prepareTime}</div>
                <div>MIN</div>
            </div>}
            <div className="recipeOverview__box recipeOverview__box--mid">
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
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeOverview)