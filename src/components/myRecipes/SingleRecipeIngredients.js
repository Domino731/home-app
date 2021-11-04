import { connect } from "react-redux"

/**
 * Recipe ingredients list
 * @param products - REDUX STATE - data about user's products ('products' subcollection in firestore), needed to display if user has specific product for recipe
 * @param recipe - REDUX STATE - data about recipe
 * @param recipeStyles - REDUX STATE - data about recipe styles - colors and icon (<svg> tag)
 */
const SingleRecipeIngredients = ({ products, recipe, recipeStyles }) => {

    /** styles - background color - primary color and box shadow */
    const styles = {
        backgroundColor: recipeStyles.colorPrimary,
        boxShadow: `0 0 0.2em ${recipeStyles.colorPrimary}, 
            0 0 1.3em ${recipeStyles.colorSecondary} inset`
    }

    return <div className="recipeIngredients">
        {recipe.ingredients.map((el, num) => {
            // check if user has particualr ingredient in his kitchen
            const productIndex = products.findIndex(prod => prod.name === el.name)
            return <div className="recipeIngredients__item" style={styles} key={`recipe-${recipe.title}-ingredient-${num}`}>

                {/* ingredient name */}
                <div className="recipeIngredients__name">{el.name}</div>

                {/* ingredient amount */}
                <div className="recipeIngredients__amount">
                    <strong>{el.amount} {el.unit} / &nbsp;</strong>
                    {/* check if user has this product in his kitchen */}
                    <strong
                        title={productIndex >= 0 ? `Posiadasz ten produkt w swojej kuchni` : `Nie posiadasz tego produktu w swojej kuchni`}
                    >
                        {productIndex >= 0 && `${products[productIndex].amount} &nbsp; ${products[productIndex].unit}`}
                        {productIndex < 0 && `Brak`}
                    </strong>
                </div>
            </div>
        })}
    </div>
}

// REDUX
const mapStateToProps = state => ({
    recipe: state.recipeData,
    products: state.products,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeIngredients)
