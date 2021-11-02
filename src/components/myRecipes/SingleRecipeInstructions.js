
import { connect } from "react-redux"

const SingleRecipeInstructions = ({ recipe, recipeStyles }) => {

    const numberColor = {
        textShadow: `0.05em 0.05em ${recipeStyles.colorPrimary}`
    }
    const circleColor = {
        color: recipeStyles.colorSecondary,
        textShadow: `none`
    }
    return <div className="recipeInstructions">
        <ul className="recipeInstructions__list">
            {recipe.instructions.map((el,num) =>  <li className="recipeInstructions__listItem" key={`single-recipe-${recipe.title}-instruction-${num}`}> 
               <span style={numberColor} className="recipeInstructions__listNumber">{num + 1}  <i className="fas fa-circle" style={circleColor}/></span> 
               &nbsp;{el}
            </li>)}
          
        </ul>
    </div>
}
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeInstructions)