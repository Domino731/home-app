//component responsible for adding to a new recipe
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
//components
import { MyRecipeAddFormInstructions } from "./MyRecipeAddFormInstructions";
import { MyRecipeAddFormIngredients } from "./MyRecipeAddFormIngredients";
import { addNewElement } from "../../fireBase/addNewElementToFirebase";

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

    const [step, setStep] = useState(1);

    /** set data about recipe */
    const handleChangeData = (e) => {
        const { name, value } = e.target
        return setData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const nextStep = () => setStep(prev => step <= 5 && prev++);
    const prevStep = () => setStep(prev => step <= 5 && prev--);

    return (
        <section className="container">
            <h1 className="titleBar addRecipe__title">Nowy Przepis</h1>

            <div className="addRecipe__content">

                {step === 1 && <>
                    <h2 className="addRecipe__label">Podaj nazwe nowego przepisu</h2>
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='title'
                        value={data.title}
                        className='addRecipe__input addRecipe__input--small' />
                    
                    <button className="addRecipe__btn addRecipe__btn--nextStep">Dodaj tytuł</button>
                </>}
            </div>

        </section>
    )
}

export default MyRecipesAddForm
