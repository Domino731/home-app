import { useState } from "react"
import { connect } from "react-redux"
import SingleRecipeIngredients from "./SingleRecipeIngredients";
import SingleRecipeInstructions from "./SingleRecipeInstructions";
import SingleRecipeNotes from "./SingleRecipeNotes";
import SingleRecipeOptions from "./SingleRecipeOptions";
const SingleRecipeContent = ({ recipe, recipeStyles }) => {
    const [selectedContent, setSelectedContent] = useState('options');
    const handleChangeContent = (e) => setSelectedContent(e.target.value);

    return <section className="recipe__item recipeContent">
        <fieldset>
            <label className={selectedContent === 'instructions' ? 'recipeContent__checkboxActive' : ''}>
                <input type='checkbox' name='selectedContent' checked={selectedContent === 'instructions'} value='instructions' onChange={handleChangeContent} />
                Instrukcje
                <span />
            </label>
            <label>
                <input type='checkbox' name='selectedContent' checked={selectedContent === 'ingredients'} value='ingredients' onChange={handleChangeContent} />
                Składniki
                <span />
            </label>
            <label>
                <input type='checkbox' name='selectedContent' checked={selectedContent === 'notes'} value='notes' onChange={handleChangeContent} />
                Notatki
                <span />
            </label>
            <label>
                <input type='checkbox' name='selectedContent' checked={selectedContent === 'options'} value='options' onChange={handleChangeContent} />
                Opcje
                <span />
            </label>
        </fieldset>

        {selectedContent === 'instructions' && <SingleRecipeInstructions />}
        {selectedContent === 'ingredients' && <SingleRecipeIngredients />}
        {selectedContent === 'notes' && <SingleRecipeNotes/>}
        {selectedContent === 'options' && <SingleRecipeOptions/>}
    </section>
}
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeContent)