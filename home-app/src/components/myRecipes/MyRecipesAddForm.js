import {useState} from "react";
import {MyRecipeAddFormInstructions} from "./MyRecipeAddFormInstructions";
import {MyRecipeAddFormIngredients} from "./MyRecipeAddFormIngredients";

export const MyRecipesAddForm = (props) => {
    const [product, setProduct] = useState({title: "", description: "", instructions: [], ingredients: []})
    const [messagesFlag, setMessagesFlag] = useState({instruction: false, ingredient: false, invalid: false})
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
        console.log(ingredient)
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
        setMessagesFlag(prev => ({
            ...prev,
            instruction: true
        }))
        setTimeout(()=>{
            setMessagesFlag(prev => ({
                ...prev,
                instruction: false
            }))
        }, 1500)
    }
    const handleAddIngredients = (e) => {
        e.preventDefault()
        setProduct(prev => ({
            ...prev,
            ingredients: [...product.ingredients, ingredient]
        }))
        setMessagesFlag(prev => ({
            ...prev,
            ingredient: true
        }))
        setTimeout(()=>{
            setMessagesFlag(prev => ({
                ...prev,
                ingredient: false
            }))
        }, 1500)
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
    const handleDeleteInstruction = (el) => {
        const array = product.instructions;
        const index = array.indexOf(el);
        if (index > -1) {
            array.splice(index, 1);
            setProduct(prev => ({
                ...prev, instruction: array
            }))
        }
    }
    const handleDeleteIngredient = el => {
        const array = product.ingredients;
        const index = array.indexOf(el);
        if (index > -1) {
            array.splice(index, 1);
            setProduct(prev => ({
                ...prev, ingredients: array
            }))
        }
    }
    const handleChangeProductInstructions = (num, text) => {
         const array = product.instructions
        array[num] = text
        setProduct(prev => ({
            ...prev,
            instructions: array
        }))
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
                    {messagesFlag.instruction && <strong className="addRecipe__msg">Dodano Instrukcję</strong>}
                    <textarea className=" addRecipe__input addRecipe__textarea" onChange={handleChangeInstruction}/>
                    <span/>
                    <button className="addRecipe__addButton" onClick={handleAddInstruction}>Dodaj</button>
                </div>

                <div className="addRecipe__element">
                    <label className="addRecipe__label">Składniki</label>
                    {messagesFlag.ingredient && <strong className="addRecipe__msg">Dodano Składnik</strong>}
                    <input type="text" className="addRecipe__input" onChange={handleChangeIngredient}/>
                    <span/>
                    <button className="addRecipe__addButton" onClick={handleAddIngredients}>Dodaj</button>
                </div>
                <div className="addRecipe__buttonsBar">
                    <button className={`addRecipe__choice ${showInstructions && "addRecipe__choice--pink"}`}
                            onClick={handleShowInstructions}>Pokaż instukcje
                    </button>
                    <button className={`addRecipe__choice ${showIngredients && "addRecipe__choice--pink"}`}
                            onClick={handleShowIngredients}>Pokaż składniki
                    </button>
                </div>
                {showIngredients &&  <ul className="addRecipe__list">{
                    product.ingredients.map((el, num) => (
                        <MyRecipeAddFormIngredients del={handleDeleteIngredient} el={el}/>
                    ))
                }</ul>}
                {showInstructions &&
                <ol className="addRecipe__list">{
                    product.instructions.map((el, num) => (
                        <MyRecipeAddFormInstructions del={handleDeleteInstruction} el={el} num={num} replace={handleChangeProductInstructions}/>
                    ))
                }</ol>

                }
            </form>
            <button>asd</button>
        </section>
    )
}
