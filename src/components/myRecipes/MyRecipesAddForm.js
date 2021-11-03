//component responsible for adding to a new recipe
import { useState } from "react";
//components
import { addNewElement } from "../../fireBase/addNewElementToFirebase";
import { useEffect } from "react";
import { auth } from "../../fireBase/fireBase";
// props //
// type --> to know for which type to add a new product
// username --> to know for which user add product
const MyRecipesAddForm = (props) => {
    //state with data about new recipe
    const [data, setData] = useState({
        title: "",
        description: "",
        instructions: [],
        ingredients: [],
        type: props.match.params.type,
        notes: '',
        kcal: '',
        servingWeight: '',
        prepareTime: ''
    })
    const [redirect, setRedirect] = useState(false)
    const [instruction, setInstruction] = useState('');

    // state with single ingredient, which is pushed into recipe state using the function
    const [ingredient, setIngredient] = useState({ name: "", amount: "", unit: "" })

    const [step, setStep] = useState(1);

    /** set data about recipe */
    const handleChangeData = (e) => {
        const { name, value } = e.target
        return setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    /** add new instruction */
    const handleAddNewInstruction = (e) => {
        // set data
        setData(prev => ({
            ...prev,
            instructions: [...prev.instructions, instruction]
        }));
        // clear instruction input
        setInstruction("");
    };

    const handleChangeInstruction = (e) => setInstruction(e.target.value);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const deleteSpecificInstruction = (index) => {
        const newData = data.instructions;
        newData.splice(index, 1);
        setData(prev => ({
            ...prev,
            instructions: newData
        }));
    }
    const handleEditSpecificInstruction = (index, value) => {
        const newData = data.instructions;
        newData[index] = value;
        setData(prev => ({
            ...prev,
            instructions: newData
        }))
    }
    const handleChangeingredient = (key, value) => {
        return setIngredient(prev => ({
            ...prev,
            [key]: value
        }));
    }
    const handleChangeIngredientUnit = (e) => setIngredient(prev => ({
        ...prev,
        unit: e.target.value
    }));
    const handleAddNewIngredient = () => {
        setData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, ingredient]
        }));
        setIngredient({ name: "", amount: "", unit: "Dag" });
    }

    const handleRemoveSpecificIngredient = (index) => {
        const newData = data.ingredients;
        newData.splice(index, 1);
        setData(prev => ({
            ...prev,
            ingredients: newData
        }));
    }
    const addNewRecipe = () => {
        return addNewElement(auth().currentUser.uid, "recipes", data)
            .then(() => window.location.replace(`/myRecipes/${props.match.params.type}`))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        console.log(data.title.length > 2 && data.ingredients.length > 1 && data.ingredients.length > 1)
    }, [step])
    return (
        <section className="container">
            <h1 className="titleBar addRecipe__title">Nowy Przepis</h1>

            <div className="addRecipe__content">

                {/* first step -> user must enter new recipe title */}
                {step === 1 && <>
                    <h2 className="addRecipe__label">Podaj nazwe nowego przepisu</h2>
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='title'
                        value={data.title}
                        className='addRecipe__input addRecipe__input--small' />

                    {/* title must has 2 characters at least */}
                    {data.title.length >= 2 && <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj tytuł</button>}
                </>}

                {step === 2 && <>
                    <h2 className="addRecipe__label">Opisz nowy przepis</h2>

                    <textarea
                        value={data.description}
                        name='description'
                        onChange={handleChangeData}
                        className='addRecipe__input addRecipe__input--textarea'
                    />

                    <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">
                        {/* detect if user enter description */}
                        {data.description.length >= 4 ? `Dodaj opis` : `Bez opisu`}
                    </button>

                    {/* back to previous step - change title  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień tytuł
                    </button>
                </>}

                {step === 3 && <>
                    <h2 className="addRecipe__label">Dodaj instrukcje</h2>

                    <textarea
                        onChange={handleChangeInstruction}
                        type='text'
                        name='instruction'
                        value={instruction}
                        className='addRecipe__input addRecipe__input--instruction' />



                    {/* check if user type new instruction */}
                    {instruction.length >= 3 && <button onClick={handleAddNewInstruction} className="addRecipe__btn addRecipe__btn--newItem" >Dodaj nową instrukcję</button>}

                    {data.instructions.length >= 1 && <>

                        <h3 className="addRecipe__listTitle">Instrukcje dla przepisu</h3>
                        <ul className='addRecipe__list'>
                            {data.instructions.map((el, num) => {
                                return <SingleInstruction
                                    deleteInstructionFnc={deleteSpecificInstruction}
                                    content={el}
                                    index={num}
                                    editInstruction={handleEditSpecificInstruction}
                                />
                            })}
                        </ul>

                    </>}
                    {/* check if user has enter 1 instruction at least */}
                    {data.instructions.length >= 1 && <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj instrukcje</button>}

                    {/* back to previous step - change description  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień opis
                    </button>
                </>}

                {step === 4 && <div className="addRecipe__step">
                    <h2 className="addRecipe__label">Dodaj składniki</h2>
                    <strong className="addRecipe__subLabel ">Nazwa</strong>
                    <input
                        onChange={(e) => handleChangeingredient('name', e.target.value)}
                        type='text'
                        name='ingredient-name'
                        value={ingredient.name}
                        className='addRecipe__input addRecipe__input--small ' />
                    <strong className="addRecipe__subLabel ">Ilość</strong>
                    <input
                        onChange={(e) => handleChangeingredient('amount', parseFloat(e.target.value))}
                        type='number'
                        name='ingredient-name'
                        min={0}
                        value={ingredient.amount}
                        className='addRecipe__input addRecipe__input--small addRecipe__input--ingredientAmount ' />
                    <fieldset className='addRecipe__ingredientUnits'>
                        <legend className="addRecipe__subLabel">Wybierz jednostkę</legend>
                        <label> <input checked={ingredient.unit === 'Kg'} type="radio" name="unit" value="Kg" onChange={handleChangeIngredientUnit} /> <span>Kilogramy</span> </label>
                        <label> <input checked={ingredient.unit === 'Dag'} type="radio" name="unit" value="Dag" onChange={handleChangeIngredientUnit} /> <span>Dekagramy </span> </label>
                        <label> <input checked={ingredient.unit === 'G'} type="radio" name="unit" value="G" onChange={handleChangeIngredientUnit} />  <span> Gramy </span> </label>
                        <label> <input checked={ingredient.unit === 'Mg'} type="radio" name="unit" value="Mg" onChange={handleChangeIngredientUnit} />  <span>Miligramy </span> </label>
                        <label> <input checked={ingredient.unit === 'Ml'} type="radio" name="unit" value="Ml" onChange={handleChangeIngredientUnit} />  <span>Mililitry </span> </label>
                        <label> <input checked={ingredient.unit === 'Na sztuki'} type="radio" name="unit" value="Na sztuki" onChange={handleChangeIngredientUnit} />  <span> Na sztuki</span> </label>
                    </fieldset>

                    {(ingredient.amount > 0 && ingredient.name.length > 2 && ingredient.unit !== "") && <button onClick={handleAddNewIngredient} className="addRecipe__btn addRecipe__btn--newItem" >Dodaj nową instrukcję</button>}

                    {data.ingredients.length > 0 && <div>
                        <h3 className="addRecipe__listTitle">Składniki</h3>
                        <ul className='addRecipe__list'>
                            {data.ingredients.map((el, num) => <li className="addRecipe__listItem" key={`new-recipe-${data.name}-ingredients-${num}`}>
                                <i className="fas fa-trash-alt addRecipe__deleteIcon" onClick={() => handleRemoveSpecificIngredient(num)} />
                                {num + 1}. <span>{el.amount} {el.unit}</span> - <p>{el.name}</p>
                            </li>)}
                        </ul>
                    </div>}

                    {/* check if user's recipe has enter 1 ingredient at least */}
                    {data.ingredients.length >= 1 && <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj notatki</button>}

                    {/* back to previous step - change instructions  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień instrukcje
                    </button>

                </div>}

                {step === 5 && <div className="addRecipe__step">
                    <h2 className="addRecipe__label">Dodaj swoje notatki</h2>
                    <textarea
                        value={data.notes}
                        name='notes'
                        onChange={handleChangeData}
                        className='addRecipe__input addRecipe__input--notes'
                    />

                    <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj dodatkowe informacje</button>
                    {/* back to previous step - change title  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień składniki
                    </button>
                </div>}

                {step === 6 && <div className="addRecipe__step">
                    <h2 className="addRecipe__label">Dodatkowe informacje</h2>
                    <strong className="addRecipe__subLabel ">Czas przygotowania (w minutach)</strong>
                    <input
                        onChange={handleChangeData}
                        type='number'
                        name='prepareTime'
                        value={data.prepareTime}
                        className='addRecipe__input addRecipe__input--small' />

                    <strong className="addRecipe__subLabel ">Kaloryczność na 100g</strong>
                    <input
                        onChange={handleChangeData}
                        type='number'
                        name='kcal'
                        value={data.kcal}
                        className='addRecipe__input addRecipe__input--small' />
                    <strong>Jedna porcja (waga w gramach)</strong>
                    <input
                        onChange={handleChangeData}
                        type='number'
                        name='servingWeight'
                        value={data.servingWeight}
                        className='addRecipe__input addRecipe__input--small' />
                    <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Przejdz do podsumowania</button>
                    {/* back to previous step - change title  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień notatki
                    </button>

                </div>}
                {step === 7 && <div className="recipeSummary">
                    <h2 className="recipeSummary__title">Podsumowanie</h2>

                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(1)}>Tytuł <i className="fas fa-edit" /></h3>
                        <p className="recipeSummary__text">{data.title}</p>
                    </div>

                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(2)}>Opis<i className="fas fa-edit" /></h3>
                        <p className="recipeSummary__text">{data.description ? data.description : `Nie dodano opisu`}</p>
                    </div>

                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(6)}>Kaloryczność na 100 gramów<i className="fas fa-edit" /></h3>
                        <p className="recipeSummary__text">{data.kcal ? data.kcal + ' kcal' : `Nie dodano kaloryczności`}</p>
                    </div>

                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(6)}>Jedna porcja<i className="fas fa-edit" /></h3>
                        <p className="recipeSummary__text">{data.servingWeight ? data.servingWeight + 'G' : `Nie dodano wagi dla jednej porcji`}</p>
                    </div>

                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(6)}>Czas przygotowania<i className="fas fa-edit" /></h3>
                        <p className="recipeSummary__text">{data.prepareTime ? data.prepareTime + ' m.' : `Nie dodano czasu`}</p>
                    </div>

                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(4)}>Składniki<i className="fas fa-edit" /></h3>
                        <ul className="recipeSummary__list">
                            {data.ingredients.map((el, num) => <li key={`recipe-summary-${data.title}-ingredient-${num}`} className="recipeSummary__listItem">
                                - <span>{el.amount}</span>  {el.unit} {el.name}
                            </li>)}
                        </ul>
                    </div>

                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(3)}>Instrukcje<i className="fas fa-edit" /></h3>
                        <ul className="recipeSummary__list">
                            {data.instructions.map((el, num) => <li key={`recipe-summary-${data.title}-instruction-${num}`} className="recipeSummary__listItem">
                                {num + 1}. {el}
                            </li>)}
                        </ul>
                    </div>

                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(2)}>Notatki<i className="fas fa-edit" /></h3>
                        <p className="recipeSummary__text">{data.notes ? data.notes : `Nie dodano dodatkowych notatek`}</p>
                    </div>

                    <button onClick={addNewRecipe} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj przepis</button>
                </div>}

                <div className="addRecipe__progressContainer">
                    <strong>Krok nr {step} / 7</strong>
                    <div className={`addRecipe__progress addRecipe__progress--${step}`}>
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                {(data.title.length > 2 && data.ingredients.length > 1 && data.ingredients.length > 1 && step !== 5 && step !== 6 && step !== 7) && <div className="addRecipe__summaryBtnWrapper">
                    <button onClick={() => setStep(6)} className="addRecipe__btn addRecipe__btn--backToSummary">Wróć do podsumowania</button>
                </div>}
            </div >

        </section>
    )
}

const SingleInstruction = ({ content, index, deleteInstructionFnc, editInstruction }) => {

    const [inputValue, setInputValue] = useState(content);
    const [isInputActive, setIsInputActive] = useState(false);

    useEffect(() => {
        return editInstruction(index, inputValue);
    }, [inputValue]);

    const handleChangeIsInputActive = () => isInputActive ? setIsInputActive(false) : setIsInputActive(true);
    const handleChangeInstruction = (e) => setInputValue(e.target.value);


    return <li className="addRecipe__listItem" >
        <i className="fas fa-trash-alt addRecipe__deleteIcon" onClick={() => deleteInstructionFnc(index)} />
        {index + 1}.
        {!isInputActive && <p> {content}</p>}
        {isInputActive && <>
            <textarea className="addRecipe__editTextarea" value={inputValue} onChange={handleChangeInstruction} onBlur={handleChangeIsInputActive} />
            <button onClick={handleChangeIsInputActive} className="addRecipe__closeBtn">Zamknij pole edycji</button>
        </>}

        {!isInputActive && <i class="fas fa-edit addRecipe__editIcon" onClick={handleChangeIsInputActive} />}
    </li>
}
export default MyRecipesAddForm
