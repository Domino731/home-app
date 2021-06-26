//component displaying instruction, it used in SingleRecipe component

// props //
// num --> displays number of instructions
// text --> instruction
export const RecipeInstructions = ({num, text}) => {
    return (
        <li className="recipe__instruciton">
            <i>{num + 1}</i>
            <p>{text}</p>
        </li>
    )
}