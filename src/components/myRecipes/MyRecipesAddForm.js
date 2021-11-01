//component responsible for adding to a new recipe
import { useState, useRef } from "react";
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

    const [fitFlags, setFitFlags] = useState({
        thirdStep: true
    });

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
        console.log(newData)
        console.log(index)
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
    return (
        <section className="container">
            <h1 className="titleBar addRecipe__title">Nowy Przepis</h1>

            <div className={`addRecipe__content ${step === 3 && `addRecipe__content--fix`}`}>

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

                {step === 3 && <div>
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
                </div>}


            </div>

        </section>
    )
}
const SingleInstruction = ({content, index, deleteInstructionFnc, editInstruction}) => {

    const [inputValue, setInputValue] = useState(content);
    const [isInputActive, setIsInputActive] = useState(false);

    useEffect(()=> {
        return editInstruction(index, inputValue);
    },[inputValue]);

    const handleChangeIsInputActive = () => isInputActive ? setIsInputActive(false) : setIsInputActive(true);
    const handleChangeInstruction = (e) => setInputValue(e.target.value); 

    
    return <li className="addRecipe__instruction" >
        <i className="fas fa-trash-alt addRecipe__deleteIcon" onClick={() => deleteInstructionFnc(index)} />
        {index + 1}. 
         {!isInputActive && <p>{content}</p> } 
         {isInputActive && <>
         <textarea className="addRecipe__editTextarea" value={inputValue} onChange={handleChangeInstruction} onBlur={handleChangeIsInputActive}/>
         <button  onClick={handleChangeIsInputActive} className="addRecipe__closeBtn">Zamknij pole edycji</button>
         </>}
        
        {!isInputActive && <i class="fas fa-edit addRecipe__editIcon" onClick={handleChangeIsInputActive}/>}
    </li>
}
export default MyRecipesAddForm
