
import { connect } from "react-redux"

/**
 * Instructions for recipe
 * @param recipe - REDUX STATE - data about recipe
 * @param recipeStyles - REDUX STATE - data about recipe styles - colors and icon (<svg> tag) 
 */
const SingleRecipeInstructions = ({ recipe, recipeStyles }) => {

    /** styles - text shadow with primary color of recipe */
    const numberColor = {
        textShadow: `0.05em 0.05em ${recipeStyles.colorPrimary}`
    }

    /** styles - secondary color for font */
    const circleColor = {
        color: recipeStyles.colorSecondary,
        textShadow: `none`
    }
    return <div className="recipeInstructions">

        <ul className="recipeInstructions__list">
            {recipe.instructions.map((el,num) =>  <li className="recipeInstructions__listItem" key={`single-recipe-${recipe.title}-instruction-${num}`}> 
               <span style={numberColor} className="recipeInstructions__listNumber">{num + 1}  
               <i className="fas fa-circle" style={circleColor}/></span> 
               &nbsp;{el}
            </li>)}  
        </ul>

    </div>
}

// REDUX
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeInstructions)