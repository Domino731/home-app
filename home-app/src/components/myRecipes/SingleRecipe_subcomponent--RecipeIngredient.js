import {getUnit} from "../../functions/getUnit";

export const RecipeIngredients = ({name, amount, unit}) => {
    return (
        <div className="recipe__ingredient">
            <div className="ingredientName">
                <i className="fas fa-utensils"/>
                <strong>{name}</strong>
            </div>
            <div className="ingredientAmount">
                <strong>{amount}</strong>
                <strong>{getUnit(unit, amount)}</strong>
            </div>
        </div>
    )
}