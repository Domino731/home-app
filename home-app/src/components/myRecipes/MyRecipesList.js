import {getCategoryText} from "../../functions/getCategoryText";

export const MyRecipesList = (props) => {
    return <div className="titleBar recipesBar">
        <h2>Dodaj Przepis</h2>
    <strong>W kategorii <i>{getCategoryText(props.match.params.type)}</i></strong></div>
}