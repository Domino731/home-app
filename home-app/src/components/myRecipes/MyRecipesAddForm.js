import {useState} from "react";

export const MyRecipesAddForm = (props) => {
    const [product, setProduct] = useState({title: "", description: "", instructions: [], ingredients: []})
    const [instruction, setInstruction] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [showIngredients, setShowIngredient] = useState(true)
    const [showInstructions, setShowInstructions] = useState(false)
    const handleChangeProduct = (e) => {
        const {name, value} = e.target
        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleChangeInstruction = (e) => {
        setInstruction(e.target.value)
    }
    const handleChangeIngredient = (e) => {
        setIngredient(e.target.value)
    }
    const handleAddInstruction = (e) => {
        e.preventDefault()
        setProduct(prev => ({
            ...prev,
            instructions: [...product.instructions, instruction]
        }))
    }
    const handleShowIngredients = (e) => {
        e.preventDefault()
        setShowIngredient(true)
        setShowInstructions(false)
    }
    const handleShowInstructions = (e) => {
        e.preventDefault()
        setShowIngredient(false)
        setShowInstructions(true)
    }
    return (
        <section className="container">
            <form className="addRecipe__Form">
                <h1 className="titleBar addRecipe__title">Nowy Przepis</h1>
                <div className="addRecipe__element">
                    <label className="addRecipe__label">Nazwa</label>
                    <input type="text" className="addRecipe__input" name="title" onChange={handleChangeProduct}/>
                    <span/>
                </div>
                <div className="addRecipe__element">
                    <label className="addRecipe__label">Opis</label>
                    <textarea className=" addRecipe__input addRecipe__textarea" name="description"
                              onChange={handleChangeProduct}/>
                    <span/>
                </div>
                <div className="addRecipe__element">
                    <label className="addRecipe__label">Instrukcje</label>
                    <textarea className=" addRecipe__input addRecipe__textarea" onChange={handleChangeInstruction}/>
                    <span/>
                    <button className="addRecipe__addButton" onClick={handleAddInstruction}>Dodaj</button>
                </div>

                <div className="addRecipe__element">
                    <label className="addRecipe__label">Składniki</label>
                    <input type="text" className="addRecipe__input" onChange={handleChangeIngredient}/>
                    <span/>
                    <button className="addRecipe__addButton">Dodaj</button>
                </div>
                <div className="addRecipe__buttonsBar">
                    <button className={`addRecipe__choice ${showInstructions && "addRecipe__choice--pink"}`}
                            onClick={handleShowInstructions}>Pokaż instukcje
                    </button>
                    <button className={`addRecipe__choice ${showIngredients && "addRecipe__choice--pink"}`}
                            onClick={handleShowIngredients}>Pokaż składniki
                    </button>
                </div>
                {showIngredients && <h1>asd</h1>}
                {showInstructions &&
                <ol className="addRecipe__ol">{
                    product.instructions.map((el, num) => (
                        <li>{el}</li>
                    ))
                }</ol>
                }
            </form>
        </section>
    )
}