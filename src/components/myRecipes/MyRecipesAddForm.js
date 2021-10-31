//component responsible for adding to a new recipe
import { useState } from "react";
import { Redirect } from "react-router-dom";
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

    // state with single instruction, which is pushed into recipe state using the function
    const [instruction, setInstruction] = useState("")

    // state with single ingredient, which is pushed into recipe state using the function
    const [ingredient, setIngredient] = useState({ name: "", amount: "", unit: "Dag" })

    const [step, setStep] = useState(2);

    /** set data about recipe */
    const handleChangeData = (e) => {
        const { name, value } = e.target
        return setData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    useEffect(() => {
        console.log(step)
    }, [step])
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

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
                        {data.description.length >= 1 ? `Dodaj opis` : `Bez opisu`}
                    </button>
                    <button onClick={prevStep} className="addRecipe__btn addRecipe__btn--prevStep">
                        Zmień tytuł
                    </button>

                </>}
            </div>

        </section>
    )
}

export default MyRecipesAddForm
