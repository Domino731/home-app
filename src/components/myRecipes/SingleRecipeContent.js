import { useState } from "react"
import SingleRecipeIngredients from "./SingleRecipeIngredients";
import SingleRecipeInstructions from "./SingleRecipeInstructions";
import SingleRecipeNotes from "./SingleRecipeNotes";
import SingleRecipeOptions from "./SingleRecipeOptions";

/**
 * content for recipe -> instructions, ingredients, notes, options
 * @returns 
 */
const SingleRecipeContent = () => {

    // selected content name, by changing this state user toggle between section in this component - instructions, ingredients, notes and options
    const [selectedContent, setSelectedContent] = useState('instructions');

    /** change selectedContent state -> toggle content */
    const handleChangeContent = (e) => setSelectedContent(e.target.value);

    return <section className="recipe__item recipeContent">

        {/* checkboxes by which use can toggle content */}
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

        {/* render appropriate content according to selectedContent state */}
        {selectedContent === 'instructions' && <SingleRecipeInstructions />}
        {selectedContent === 'ingredients' && <SingleRecipeIngredients />}
        {selectedContent === 'notes' && <SingleRecipeNotes/>}
        {selectedContent === 'options' && <SingleRecipeOptions/>}

    </section>
}

export default SingleRecipeContent