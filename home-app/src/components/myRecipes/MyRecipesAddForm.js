import {useState} from "react";
import {MyRecipeAddFormInstructions} from "./MyRecipeAddFormInstructions";
import {MyRecipeAddFormIngredients} from "./MyRecipeAddFormIngredients";
import { Redirect} from "react-router-dom";
export const MyRecipesAddForm = (props) => {
    const [product, setProduct] = useState({title: "", description: "", instructions: [], ingredients: []})
    const [messagesFlag, setMessagesFlag] = useState({
        instruction: false,
        ingredient: false,
        invalid: false,
        ingredientName: false,
        ingredientAmount: false
    })
    const [instruction, setInstruction] = useState("")
    const [ingredient, setIngredient] = useState({name: "", amount: "", unit: "Dag"})
    const [showIngredients, setShowIngredient] = useState(true)
    const [showInstructions, setShowInstructions] = useState(false)
    const [animationClass, setAnimationClass] = useState(false)
    const [redirectFlag, setRedirectFlag] = useState(false)
    const [sendButtonText, setSendButtonText] = useState("Dodaj przepis do kolekcji")
    const handleChangeProduct = e => {
        const {name, value} = e.target
        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleChangeInstruction = e => {
        setInstruction(e.target.value)
    }
    const handleChangeIngredient = e => {
        const {name, value} = e.target
        setIngredient(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleAddInstruction = e => {
        e.preventDefault()
        setProduct(prev => ({
            ...prev,
            instructions: [...product.instructions, instruction]
        }))
        setMessagesFlag(prev => ({
            ...prev,
            instruction: true
        }))
        setTimeout(() => {
            setMessagesFlag(prev => ({
                ...prev,
                instruction: false
            }))
        }, 1500)
    }
    const handleAddIngredients = e => {
        e.preventDefault()
        if (ingredient.name.length > 0 && ingredient.amount.length > 0) {
            setProduct(prev => ({
                ...prev,
                ingredients: [...product.ingredients, ingredient]
            }))
            setMessagesFlag(prev => ({
                ...prev,
                ingredient: true
            }))
            setTimeout(() => {
                setMessagesFlag(prev => ({
                    ...prev,
                    ingredient: false
                }))
            }, 1500)
            console.log(true)
        }
        if (ingredient.name.length === 0) {
            setMessagesFlag(prev => ({
                ...prev,
                ingredientName: true
            }))
            setTimeout(() => {
                setMessagesFlag(prev => ({
                    ...prev,
                    ingredientName: false
                }))
            }, 4000)
        }
        if (ingredient.amount.length === 0) {
            setMessagesFlag(prev => ({
                ...prev,
                ingredientAmount: true
            }))
            setTimeout(() => {
                setMessagesFlag(prev => ({
                    ...prev,
                    ingredientAmount: false
                }))
            }, 4000)
        }
    }
    const handleChangeUnit = e => {
        setIngredient(prev => ({
            ...prev,
            unit: e.target.value
        }))
    }
    const handleShowIngredients = e => {
        e.preventDefault()
        setShowIngredient(true)
        setShowInstructions(false)
    }
    const handleShowInstructions = e => {
        e.preventDefault()
        setShowIngredient(false)
        setShowInstructions(true)
    }
    const handleDeleteInstruction = el => {
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
    const handleSendRecipe = () => {
        setAnimationClass(true)
        setSendButtonText("Dodano przepis")
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
                    {messagesFlag.instruction &&
                    <strong className="addRecipe__msg addRecipe__msg--true">Dodano Instrukcję</strong>}
                    <textarea className=" addRecipe__input addRecipe__textarea" onChange={handleChangeInstruction}/>
                    <span/>
                    <button className="addRecipe__addButton" onClick={handleAddInstruction}>Dodaj</button>
                </div>

                <div className="addRecipe__element">
                    <label className="addRecipe__label">Składniki</label>

                    {messagesFlag.ingredient &&
                    <strong className="addRecipe__msg addRecipe__msg--true">Dodano Składnik</strong>}
                    {messagesFlag.ingredientAmount &&
                    <strong className="addRecipe__msg addRecipe__msg--false">*Podaj ilość</strong>}
                    {messagesFlag.ingredientName &&
                    <strong className="addRecipe__msg addRecipe__msg--false">*Podaj Nazwę</strong>}
                    <input type="text" className="addRecipe__input" onChange={handleChangeIngredient}
                           placeholder="nazwa" name="name" value={ingredient.name}/>
                    <input type="number" className="addRecipe__input addRecipe__input--amount"
                           onChange={handleChangeIngredient} placeholder={`ilość(${ingredient.unit})`} name="amount"
                           value={ingredient.amount}/>
                    <fieldset className="addRecipe__fieldset">
                        <label> <input type="radio" name="weightUnit" value="Kg" onClick={handleChangeUnit}/> Kilogramy
                        </label>
                        <label> <input type="radio" name="weightUnit" value="Dag" onClick={handleChangeUnit}
                                       defaultChecked/> Dekagramy </label>
                        <label> <input type="radio" name="weightUnit" value="G" onClick={handleChangeUnit}
                                       id="1t"/> Gramy </label>
                        <label> <input type="radio" name="weightUnit" value="Mg" onClick={handleChangeUnit}/> Miligramy
                        </label>
                        <label> <input type="radio" name="weightUnit" value="Ml" onClick={handleChangeUnit}/> Mililitry
                        </label>
                        <label> <input type="radio" name="weightUnit" value="Na sztuki" onClick={handleChangeUnit}/> Na
                            sztuki
                        </label>
                    </fieldset>
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
                {showIngredients && <ul className="addRecipe__list">{
                    product.ingredients.map((el, num) => (
                        <MyRecipeAddFormIngredients del={handleDeleteIngredient} el={el} ingredient={el}/>
                    ))
                }</ul>}
                {showInstructions && <ol className="addRecipe__list">{
                    product.instructions.map((el, num) => (
                        <MyRecipeAddFormInstructions del={handleDeleteInstruction} el={el} num={num}
                                                     replace={handleChangeProductInstructions}/>
                    ))
                }</ol>}
            </form>
            {redirectFlag && <Redirect to={`/myRecipes/${props.match.params.type}`}/>}
            <button className={`addRecipe__btn ${animationClass && "animatedRedirect--backToCategory"}`}
                    onClick={handleSendRecipe}>{sendButtonText}<span/></button>
        </section>
    )
}
