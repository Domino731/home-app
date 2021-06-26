//component containing a single instruction from a recipe,
// it used in MyRecipeAddForm and MyRecipeEditForm components

import {useState} from "react";

// props //
// del --> function that deletes a instruction
// replace --> function that changes the specific instruction in recipe
// el --> specific instruction to delete
// num --> number of instruction

export const MyRecipeAddFormInstructions = ({del,replace, el , num}) => {

    // flag that allows you to show an input so you can edit the instruction
    const [flag, setFlag] = useState(true)

    //state holding new instruction
    const [newInstruction, setNewInstruction] = useState("")

    // function that hides or shows input
    const handleChangeFlag = () => {
        if (flag) {
            setFlag(false)
        } else {
            setFlag(true)
        }
        console.log(true)
    }

    //function that delete a instruction
    const handleDelete = (e) => {
        e.preventDefault()
        if (typeof del === "function") {
            del(el)
        }
    }

    //function that change the specific instruction in recipe
    const handleReplace = () => {
        if (typeof replace === "function") {
            if(newInstruction.length !== 0){
            replace(num, newInstruction)
                handleChangeFlag()
            }
            else{
                handleChangeFlag()
            }
        }
    }

    //function that changing the newInstruction state
    const handleSetNewInstruction = e => {
        setNewInstruction(e.target.value)
    }
    return (
            <li>
                {/*instruction*/}
                {flag && <>
                   <i className="fas fa-edit" onClick={handleChangeFlag}/><i className="fas fa-trash-alt"
                                                                             onClick={handleDelete}/>
                    <p>{el}</p>
                            </>}

                {/*new instruction*/}
                {flag === false && <>
                <i className="far fa-times-circle" onClick={handleChangeFlag}/><i className="fas fa-save" onClick={handleReplace}/>
                <textarea  placeholder="Wprowadz nową instukcję" onChange={handleSetNewInstruction}/>
                </>}
            </li>
    )
}