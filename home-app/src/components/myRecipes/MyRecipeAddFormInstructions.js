import {useState} from "react";

export const MyRecipeAddFormInstructions = ({del,replace, el , num}) => {
    const [flag, setFlag] = useState(true)
    const [newInstruction, setNewInstruction] = useState("")
    const handleChangeFlag = () => {
        if (flag) {
            setFlag(false)
        } else {
            setFlag(true)
        }
        console.log(true)
    }
    const handleDelete = (e) => {
        e.preventDefault()
        if (typeof del === "function") {
            del(el)
        }
    }
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
    const handleSetNewInstruction = e => {
        setNewInstruction(e.target.value)
    }
    return (
            <li>
                {flag && <>
                   <i className="fas fa-edit" onClick={handleChangeFlag}/><i className="fas fa-trash-alt"
                                                                             onClick={handleDelete}/>
                    <p>{el}</p>
                            </>}
                {flag === false && <>
                <i className="far fa-times-circle" onClick={handleChangeFlag}/><i className="fas fa-save" onClick={handleReplace}/>
                <textarea  placeholder="Wprowadz nową instukcję" onChange={handleSetNewInstruction}/>
                </>}
            </li>
    )
}