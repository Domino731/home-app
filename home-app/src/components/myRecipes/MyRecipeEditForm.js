import {useEffect, useState} from "react";
import {addNewElement} from "../../functions/addNewElementToFirebase";
import {updateDataFirestore} from "../../functions/updateDataFirestore";
import {MyRecipeAddFormIngredients} from "./MyRecipeAddFormIngredients";
import {MyRecipeAddFormInstructions} from "./MyRecipeAddFormInstructions";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const MyRecipeEditForm = (props) => {
    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        instructions: [],
        ingredients: [],
        type: props.match.params.type
    })
    const [instruction, setInstruction] = useState("")
    const [ingredient, setIngredient] = useState({name: "", amount: "", unit: "Dag"})
    const [messagesFlag, setMessagesFlag] = useState({
        instruction: false,
        ingredient: false,
        invalid: false,
        ingredientName: false,
        ingredientAmount: false
    })
    const [showIngredients, setShowIngredient] = useState(true)
    const [showInstructions, setShowInstructions] = useState(false)
    const [animationClass, setAnimationClass] = useState(false)
    const [redirectFlag, setRedirectFlag] = useState(false)
    const [sendButtonText, setSendButtonText] = useState("Zapisz zmiany")
    const [invalidForm, setInvalidForm] = useState({
        ingredients: false,
        instruction: false,
        title: false
    })
    useEffect(() => {
        if (props.allRecipes !== null) {
           const data = props.allRecipes.filter(el => el.id === props.match.params.id)
           setRecipe(data[0])
        }
    }, [props.allRecipes])
    const handleChangeRecipe = e => {
        const {name, value} = e.target
        setRecipe(prev => ({
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
        setRecipe(prev => ({
            ...prev,
            instructions: [...recipe.instructions, instruction]
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
            setRecipe(prev => ({
                ...prev,
                ingredients: [...recipe.ingredients, ingredient]
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
        const array = recipe.instructions;
        const index = array.indexOf(el);
        if (index > -1) {
            array.splice(index, 1);
            setRecipe(prev => ({
                ...prev, instruction: array
            }))
        }
    }
    const handleDeleteIngredient = el => {
        const array = recipe.ingredients;
        const index = array.indexOf(el);
        if (index > -1) {
            array.splice(index, 1);
            setRecipe(prev => ({
                ...prev, ingredients: array
            }))
        }
    }
    const handleChangeRecipeInstructions = (num, text) => {
        const array = recipe.instructions
        array[num] = text
        setRecipe(prev => ({
            ...prev,
            instructions: array
        }))
    }
    const handleSendEditedRecipe = (e) => {
        e.preventDefault()
        if (recipe.title.length > 0 && recipe.ingredients.length > 0 && recipe.instructions.length > 0) {
            updateDataFirestore(props.match.params.id, props.username, "recipes", recipe, () => null)
            setAnimationClass(true)
            setSendButtonText("Zapisano zmiany")
            setTimeout(() => {
                setRedirectFlag(true)
            }, 1700)
        }
        if (recipe.title.length === 0) {
            setInvalidForm(prev => ({
                ...prev, title: true
            }))
        }
        if (recipe.ingredients.length === 0) {
            setInvalidForm(prev => ({
                ...prev, ingredients: true
            }))
        }
        if (recipe.instructions.length === 0) {
            setInvalidForm(prev => ({
                ...prev, instruction: true
            }))
        }
    }
    if (recipe === undefined) {
        return null
    } else {
        return (
            <section className="container">
                <form className="addRecipe__Form">
                    <h1 className="titleBar addRecipe__title">Edytuj Przepis</h1>
                    <div className="addRecipe__element">
                        <label className="addRecipe__label">*Nazwa</label>
                        <input type="text" className="addRecipe__input" name="title" onChange={handleChangeRecipe}
                               maxLength="40" placeholder={recipe.title}/>
                        <span/>
                    </div>
                    <div className="addRecipe__element">
                        <label className="addRecipe__label">Opis</label>
                        <textarea className=" addRecipe__input addRecipe__textarea" name="description"
                                  onChange={handleChangeRecipe} placeholder={recipe.description}/>
                        <span/>
                    </div>
                    <div className="addRecipe__element">
                        <label className="addRecipe__label">*Instrukcje</label>
                        {messagesFlag.instruction &&
                        <strong className="addRecipe__msg addRecipe__msg--true">Dodano Instrukcję</strong>}
                        <textarea className=" addRecipe__input addRecipe__textarea" onChange={handleChangeInstruction}/>
                        <span/>
                        <button className="addRecipe__addButton" onClick={handleAddInstruction}>Dodaj <i/></button>
                    </div>

                    <div className="addRecipe__element">
                        <label className="addRecipe__label">*Składniki</label>

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
                            <label> <input type="radio" name="weightUnit" value="Kg"
                                           onClick={handleChangeUnit}/> Kilogramy
                            </label>
                            <label> <input type="radio" name="weightUnit" value="Dag" onClick={handleChangeUnit}
                                           defaultChecked/> Dekagramy </label>
                            <label> <input type="radio" name="weightUnit" value="G" onClick={handleChangeUnit}
                                           id="1t"/> Gramy </label>
                            <label> <input type="radio" name="weightUnit" value="Mg"
                                           onClick={handleChangeUnit}/> Miligramy
                            </label>
                            <label> <input type="radio" name="weightUnit" value="Ml"
                                           onClick={handleChangeUnit}/> Mililitry
                            </label>
                            <label> <input type="radio" name="weightUnit" value="Na sztuki"
                                           onClick={handleChangeUnit}/> Na
                                sztuki
                            </label>
                        </fieldset>
                        <span/>
                        <button className="addRecipe__addButton" onClick={handleAddIngredients}>Dodaj<i/></button>

                    </div>
                    <div className="addRecipe__buttonsBar">
                        <button className={`addRecipe__choice ${showInstructions && "addRecipe__choice--pink"}`}
                                onClick={handleShowInstructions}>Pokaż instukcje
                        </button>
                        <button className={`addRecipe__choice ${showIngredients && "addRecipe__choice--pink"}`}
                                onClick={handleShowIngredients}>Pokaż składniki
                        </button>
                    </div>
                    {showIngredients && <ol className="addRecipe__list">{
                        recipe.ingredients.length > 0 ?
                            recipe.ingredients.map((el, num) => (
                                <MyRecipeAddFormIngredients del={handleDeleteIngredient} el={el} ingredient={el} key={`${num}--ingredientForm`}/>
                            ))
                            :
                            "Brak dodanych składników"
                    }</ol>

                    }
                    {showInstructions && <ol className="addRecipe__list">
                        {
                            recipe.instructions.length > 0 ?
                                recipe.instructions.map((el, num) => (
                                    <MyRecipeAddFormInstructions del={handleDeleteInstruction} el={el} num={num}
                                                                 replace={handleChangeRecipeInstructions}/>
                                )) : "Brak dodanych instrukcji"
                        }</ol>}

                    <button className={`addRecipe__btn ${animationClass && "animatedRedirect--backToCategory"}`}
                            onClick={handleSendEditedRecipe}>{sendButtonText}<span/></button>
                </form>
                {invalidForm.title &&
                <strong className="addRecipe__msg addRecipe__msg--invalidForm">*dodaj tytuł</strong>}
                {invalidForm.ingredients &&
                <strong className="addRecipe__msg addRecipe__msg--invalidForm">*dodaj conajmniej jeden
                    składnik</strong>}
                {invalidForm.instruction &&
                <strong className="addRecipe__msg addRecipe__msg--invalidForm">*dodaj conajmniej jedną
                    instrukcję </strong>}



                {redirectFlag && <Redirect to={`/myRecipe/${props.match.params.id}`}/>}
            </section>
        )
    }
}
const mapStateToProps = state => ({
    username: state.currentUser.displayName,
    allRecipes: state.recipes
})
export default connect(mapStateToProps)(MyRecipeEditForm)