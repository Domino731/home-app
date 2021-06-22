export const RecipeInstructions = ({num, text}) => {
    return (
        <div className="recipe__instruciton">
            <i>{num + 1}</i>
            <p>{text}</p>
        </div>
    )
}