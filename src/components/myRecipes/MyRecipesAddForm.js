//component responsible for adding to a new recipe
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//components
import { MyRecipeAddFormInstructions } from "./MyRecipeAddFormInstructions";
import { MyRecipeAddFormIngredients } from "./MyRecipeAddFormIngredients";
import { addNewElement } from "../../fireBase/addNewElementToFirebase";
import { useEffect } from "react";
// props //
// type --> to know for which type to add a new product
// username --> to know for which user add product
const MyRecipesAddForm = (props) => {
    //state with new recipe
    const [data, setData] = useState({
        title: "",
        description: "",
        instructions: [],
        ingredients: [],
        type: props.match.params.type
    })

    const [instruction, setInstruction] = useState('');

    // state with single ingredient, which is pushed into recipe state using the function
    const [ingredient, setIngredient] = useState({ name: "", amount: "", unit: "Dag" })

    const [step, setStep] = useState(3);

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
        newData.splice(index,1);
        console.log(newData)
        console.log(index)
        setData(prev => ({
            ...prev,
            instructions: newData
        }));
    }
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
                        type='textarea'
                        name='description'
                        onChange={handleChangeData}
                        className='addRecipe__input addRecipe__input--textarea'
                    />

                    <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">
                        {/* detect if user enter description */}
                        {data.description.length >= 1 ? `Dodaj opis` : `Bez opisu`}
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

                        <h3 className="addRecipe__instructionsTitle">Instrukcje dla przepisu</h3> 

                        <ul className='addRecipe__instructionsList'>
                            {data.instructions.map((el, num) => <li className="addRecipe__instruction" key={`new-recipe-${data.title}-instruction-${num}`}>
                            <i className="fas fa-trash-alt addRecipe__deleteIcon" onClick={() => deleteSpecificInstruction(num)}/> {num + 1}. {el}
                            </li>)}
                        </ul>

                    </>}
                    {/* check if user has enter 1 instruction at least */}
                    {data.instructions.length >= 1 && <button onClick={nextStep} className="addRecipe__btn addRecipe__btn--nextStep">Dodaj instrukcje</button>}

                    {/* back to previous step - change description  */}
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień opis
                    </button>
                </>}


            </div>

        </section>
    )
}

export default MyRecipesAddForm
