import { connect } from "react-redux"

const SingleRecipeIngredients = ({products, recipe, recipeStyles}) => {
    console.log(products)
    /** background color - primary */
    const styles = {
            backgroundColor: recipeStyles.colorPrimary,
            boxShadow: `0 0 0.2em ${recipeStyles.colorPrimary}, 
            0 0 1.3em ${recipeStyles.colorSecondary} inset`
    }
    return <div className="recipeIngredients">
        {recipe.ingredients.map((el,num) => {
             // check if user has particualr ingredient in his kitchen
            const productIndex = products.findIndex(prod => prod.name === el.name)
            return <div className="recipeIngredients__item" style={styles}>
                  <div className="recipeIngredients__name">{el.name}</div>
                  <div className="recipeIngredients__amount">
                      <strong>{el.amount} {el.unit} / &nbsp;</strong>

                      <strong
                      title={productIndex  >= 0 ? `Posiadasz ten produkt w swojej kuchni` : `Nie posiadasz tego produktu w swojej kuchni`}
                      >
                          {productIndex  >= 0 && `${products[productIndex].amount} &nbsp; ${products[productIndex].unit}`}
                          {productIndex < 0 && `Brak`}
                      </strong>
                  </div>
            </div>
        })}
    </div>
}


const mapStateToProps = state => ({
    recipe: state.recipeData,
    products: state.products,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeIngredients)
