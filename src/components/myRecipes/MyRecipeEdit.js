import { auth } from "../../fireBase/fireBase";
import { useEffect, useState } from "react";
import { addNewElement } from "../../fireBase/addNewElementToFirebase";
import { SingleInstruction } from "./MyRecipesAddForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Loading } from "../loading/Loading";
import { getRecipeData } from "../../fireBase/getRecipeData";

export const MyRecipeEdit = () => {
   
    // references
    const {id} = useParams();
    const recipeId = id;

    //state with data about new recipe
    const [data, setData] = useState(null);

    // state with instruction text
    const [instruction, setInstruction] = useState('');

    // state with single ingredient data
    const [ingredient, setIngredient] = useState({ name: "", amount: "", unit: "" })

    // current step
    // 1 - recipe title
    // 2 - describe recipe (not required)
    // 3 - add instructions (1 instruction at least)
    // 4 - add ingredients (1 ingredient at least)
    // 5 - recipe notes (not required)
    // 6 - additions (not required) - kcal, servingWeight, prepareTime
    // 7 - summary
    // by changing this state the specific section will displayed
    const [step, setStep] = useState(7);

    // fetch data about recipe that you want to edit
    useEffect(()=> {
       auth().onAuthStateChanged(user => user && getRecipeData(user.uid, recipeId, setData))
    },[]);

    /** chande data state - set data about recipe */
    const handleChangeData = (e) => {
        const { name, value } = e.target
        return setData(prev => ({
            ...prev,
            [name]: value
        }));
    }


    /** change instruction state*/
    const handleChangeInstruction = (e) => setInstruction(e.target.value);

    /** switch to next step */
    const nextStep = () => setStep(prev => prev + 1);

    /** back to previous step */
    const prevStep = () => setStep(prev => prev - 1);

    /** add new instruction to data.instructions state */
    const handleAddNewInstruction = (e) => {
        // set new data
        setData(prev => ({
            ...prev,
            instructions: [...prev.instructions, instruction]
        }));

        // clear instruction input
        return setInstruction("");
    };

    /** delete specific instruction from  data.instructions state
     * @param {number} index - index of instruction that you want to delete
     */
    const deleteSpecificInstruction = (index) => {
        const newData = data.instructions;
        newData.splice(index, 1);
        return setData(prev => ({
            ...prev,
            instructions: newData
        }));
    }

    /** edit specific instruction in data.instructions state
     * @param {number} index - index of instruction that you want to change
     * @param {string} value - new value
     */
    const handleEditSpecificInstruction = (index, value) => {
        const newData = data.instructions;
        newData[index] = value;
        return setData(prev => ({
            ...prev,
            instructions: newData
        }));
    }

    /**
     * change ingredient state - change data about ingredient 
     */
    const handleChangeingredient = (e) => {
        const { name, value } = e.target;
        return setIngredient(prev => ({
            ...prev,
            [name]: value
        }));
    }

    /** change ingredient.unit state */
    const handleChangeIngredientUnit = (e) => setIngredient(prev => ({
        ...prev,
        unit: e.target.value
    }));

    /** add new ingredient to data.ingredients state */
    const handleAddNewIngredient = () => {
        // set new data
        setData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, ingredient]
        }));

        // clear ingredient data
        return setIngredient({ name: "", amount: "", unit: "" });
    }

    /**
     * remove specific ingredient from data.ingredients state
     * @param {number} index -index of ingredient that you want to delete
     */
    const handleRemoveSpecificIngredient = (index) => {
        const newData = data.ingredients;
        newData.splice(index, 1);
        return setData(prev => ({
            ...prev,
            ingredients: newData
        }));
    }

    /** add recipe to user's account in firestore database - 'recipes' subcollection */
    const addNewRecipe = () => {
        return addNewElement(auth().currentUser.uid, "recipes", data)
            // redirect user to edited reciepe
            .then(() => window.location.replace(`/myRecipe/${data.id}`))
            .catch(err => console.log(err))
    }

    if(data === null){
        return <Loading/>
    }
    return (
        <section className="container">

            {/* title */}
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

                {/* second step -> description for recipe (not required) */}
                {step === 2 && <>

                    <h2 className="addRecipe__label">Opisz nowy przepis</h2>
                    <textarea
                        value={data.description}
                        name='description'
                        onChange={handleChangeData}
                        className='addRecipe__input addRecipe__input--textarea'
                    />

                    {/* next step */}
                    <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">
                        {/* detect if user enter description */}
                        {data.description.length > 0 ? `Dodaj instrukcje` : `Bez opisu`}
                    </button>

                    {/* back to previous step - change title  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień tytuł
                    </button>
                </>}

                {/* third step -> add instruction (1 instruction at least) */}
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

                    {/* list with instructions */}
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
                    {data.instructions.length >= 1 && <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj składniki</button>}

                    {/* back to previous step - change description  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień opis
                    </button>
                </>}

                {/* fourth step -> add ingredients (1 ingredient at least) */}
                {step === 4 && <div className="addRecipe__step">
                    <h2 className="addRecipe__label">Dodaj składniki</h2>

                    {/* ingredient name */}
                    <strong className="addRecipe__subLabel ">Nazwa</strong>
                    <input
                        onChange={handleChangeingredient}
                        type='text'
                        name='name'
                        value={ingredient.name}
                        className='addRecipe__input addRecipe__input--small ' />

                    {/* ingredient amount */}
                    <strong className="addRecipe__subLabel ">Ilość</strong>
                    <input
                        onChange={handleChangeingredient}
                        type='number'
                        name='amount'
                        min={0}
                        value={ingredient.amount}
                        className='addRecipe__input addRecipe__input--small addRecipe__input--ingredientAmount ' />

                    {/* ingredient weight unit */}
                    <fieldset className='addRecipe__ingredientUnits'>
                        <legend className="addRecipe__subLabel">Wybierz jednostkę</legend>
                        <label> <input checked={ingredient.unit === 'Kg'} type="radio" name="unit" value="Kg" onChange={handleChangeIngredientUnit} /> <span>Kilogramy</span> </label>
                        <label> <input checked={ingredient.unit === 'Dag'} type="radio" name="unit" value="Dag" onChange={handleChangeIngredientUnit} /> <span>Dekagramy </span> </label>
                        <label> <input checked={ingredient.unit === 'G'} type="radio" name="unit" value="G" onChange={handleChangeIngredientUnit} />  <span> Gramy </span> </label>
                        <label> <input checked={ingredient.unit === 'Mg'} type="radio" name="unit" value="Mg" onChange={handleChangeIngredientUnit} />  <span>Miligramy </span> </label>
                        <label> <input checked={ingredient.unit === 'Ml'} type="radio" name="unit" value="Ml" onChange={handleChangeIngredientUnit} />  <span>Mililitry </span> </label>
                        <label> <input checked={ingredient.unit === 'Na sztuki'} type="radio" name="unit" value="Na sztuki" onChange={handleChangeIngredientUnit} />  <span> Na sztuki</span> </label>
                    </fieldset>

                    {/* button by which user can add new ingredient into data.ingredients state */}
                    {(ingredient.amount > 0 && ingredient.name.length > 2 && ingredient.unit !== "") && <button onClick={handleAddNewIngredient} className="addRecipe__btn addRecipe__btn--newItem" >Dodaj nową instrukcję</button>}

                    {/* list with ingredients */}
                    {data.ingredients.length > 0 && <div>
                        <h3 className="addRecipe__listTitle">Składniki</h3>
                        <ul className='addRecipe__list'>

                            {data.ingredients.map((el, num) => <li className="addRecipe__listItem" key={`new-recipe-${data.name}-ingredients-${num}`}>
                                {/* user can remove this ingredient from data.ingredients state*/}
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

                {/* fifth step -> add notes for recipe (not required) */}
                {step === 5 && <div className="addRecipe__step">

                    <h2 className="addRecipe__label">Dodaj swoje notatki</h2>
                    <textarea
                        value={data.notes}
                        name='notes'
                        onChange={handleChangeData}
                        className='addRecipe__input addRecipe__input--notes'
                    />

                    {/* next step */}
                    <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj dodatkowe informacje</button>

                    {/* back to previous step - change ingredients  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień składniki
                    </button>

                </div>}

                {/* six step -> add additional data -> prepare time (in minutes),  kcal per 100g, weight for single serving */}
                {step === 6 && <div className="addRecipe__step">
                    <h2 className="addRecipe__label">Dodatkowe informacje</h2>

                    {/* prepare time */}
                    <strong className="addRecipe__subLabel ">Czas przygotowania (w minutach)</strong>
                    <input
                        onChange={handleChangeData}
                        type='number'
                        name='prepareTime'
                        value={data.prepareTime}
                        className='addRecipe__input addRecipe__input--small' />

                    {/* kcal per 100g */}
                    <strong className="addRecipe__subLabel ">Kaloryczność na 100g</strong>
                    <input
                        onChange={handleChangeData}
                        type='number'
                        name='kcal'
                        value={data.kcal}
                        className='addRecipe__input addRecipe__input--small' />

                    {/* weight for single serving */}
                    <strong>Jedna porcja (waga w gramach)</strong>
                    <input
                        onChange={handleChangeData}
                        type='number'
                        name='servingWeight'
                        value={data.servingWeight}
                        className='addRecipe__input addRecipe__input--small' />

                    {/* next step - summary */}
                    <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Przejdz do podsumowania</button>

                    {/* back to previous step - change notes  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień notatki
                    </button>

                </div>}

                {/* seventh step -> see your recipe  */}
                {step === 7 && <div className="recipeSummary">
                    <h2 className="recipeSummary__title">Podsumowanie</h2>

                    {/* title */}
                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(1)}>Tytuł <i className="fas fa-edit" /></h3>
                        <p className="recipeSummary__text">{data.title}</p>
                    </div>

                    {/* description */}
                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(2)}>Opis<i className="fas fa-edit" /></h3>
                        {/* check if user has entered description */}
                        <p className="recipeSummary__text">{data.description ? data.description : `Nie dodano opisu`}</p>
                    </div>

                    {/* kcal per 100g */}
                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(6)}>Kaloryczność na 100 gramów<i className="fas fa-edit" /></h3>
                        {/* check if user has entered kcal */}
                        <p className="recipeSummary__text">{data.kcal ? data.kcal + ' kcal' : `Nie dodano kaloryczności`}</p>
                    </div>

                    {/* weight for one serving */}
                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(6)}>Jedna porcja<i className="fas fa-edit" /></h3>
                        {/* check if user has entered serving weight */}
                        <p className="recipeSummary__text">{data.servingWeight ? data.servingWeight + 'G' : `Nie dodano wagi dla jednej porcji`}</p>
                    </div>

                    {/* prepare time */}
                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(6)}>Czas przygotowania<i className="fas fa-edit" /></h3>
                        {/* check if has entered prepare time */}
                        <p className="recipeSummary__text">{data.prepareTime ? data.prepareTime + ' m.' : `Nie dodano czasu`}</p>
                    </div>

                    {/* ingredients */}
                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(4)}>Składniki<i className="fas fa-edit" /></h3>
                        <ul className="recipeSummary__list">
                            {data.ingredients.map((el, num) => <li key={`recipe-summary-${data.title}-ingredient-${num}`} className="recipeSummary__listItem">
                                - <span>{el.amount}</span>  {el.unit} {el.name}
                            </li>)}
                        </ul>
                    </div>

                    {/* instructions list  */}
                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(3)}>Instrukcje<i className="fas fa-edit" /></h3>
                        <ul className="recipeSummary__list">
                            {data.instructions.map((el, num) => <li key={`recipe-summary-${data.title}-instruction-${num}`} className="recipeSummary__listItem">
                                {num + 1}. {el}
                            </li>)}
                        </ul>
                    </div>

                    {/* notes     */}
                    <div className="recipeSummary__item">
                        <h3 className="recipeSummary__itemTitle" onClick={() => setStep(2)}>Notatki<i className="fas fa-edit" /></h3>
                        {/* check if user has entered notes for recipe */}
                        <p className="recipeSummary__text">{data.notes ? data.notes : `Nie dodano dodatkowych notatek`}</p>
                    </div>

                    {/* button by which user can add new recipe */}
                    <button onClick={addNewRecipe} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj przepis</button>
                </div>}

                {/* container with dots which are representing current step */}
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

                {/* back to summary button */}
                {(data.title.length > 2 && data.ingredients.length > 1 && data.ingredients.length > 1 && step !== 5 && step !== 6 && step !== 7) && <div className="addRecipe__summaryBtnWrapper">
                    <button onClick={() => setStep(6)} className="addRecipe__btn addRecipe__btn--backToSummary">Wróć do podsumowania</button>
                </div>}
            </div >

        </section>
    )
}