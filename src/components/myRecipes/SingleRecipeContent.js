import { useState } from "react"
import { connect } from "react-redux"

const SingleRecipeContent = ({ recipe, recipeStyles }) => {
    const [selectedContent, setSelectedContent] = useState('instructions');
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
    </section>
}
const mapStateToProps = state => ({
    recipe: state.recipeData,
    recipeStyles: state.recipeStyles
})
export default connect(mapStateToProps)(SingleRecipeContent)