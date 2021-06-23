import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {deleteDataFirestore} from "../../functions/deleteDataFirestore";
import {updateDataFirestore} from "../../functions/updateDataFirestore";

const SingleTask = ({toDo, username}) => {
    const [task, setTask] = useState(toDo)
    const [operationFormFlag, setOperationFormFlag] = useState(false)
    const [operationValue, setOperationValue] = useState("")
    useEffect(() => {
        updateDataFirestore(task.id, username, "ToDo", task, null)
    }, [task.archive, task.operations])
    const handleDeleteTask = () => {
        deleteDataFirestore(task.id, username, "ToDo")
    }
    const handleArchiveTask = () => {
        setTask(prev => ({
            ...prev,
            archive: true
        }))
    }
    const handleChangeOpsFlag = () => {
        if (operationFormFlag) {
            setOperationFormFlag(false)
        } else {
            setOperationFormFlag(true)
        }
    }
    const handleChangeOpValue = e => {
        setOperationValue(e.target.value)
    }
    const handleAddOperation = e => {
        e.preventDefault()
        operations.push(operationValue)
        setTask(prev => ({
            ...prev,
            operations: operations
        }))
    }
    let operations = task.operations
    const handleRemoveOperation = el => {
        const array = task.operations;
        const index = array.indexOf(el);
        if (index > -1) {
            array.splice(index, 1);
        }
        setTask(prev => ({
            ...prev,
            operations: array
        }))
    }
    if (task.operations === undefined) {
        return null
    } else {
        return <section className="singleTask">
            <span className="corner"/>
            <h3 className="singleTask__title">{task.title}</h3>
            <div className="singleTask__description">{task.description}
            </div>
            <div className="singleTask__panel">
                {task.operations.length === 0 &&
                <button className="panelBtn panelBtn--delete" onClick={handleDeleteTask}><i
                    className="fas fa-trash-alt"/>
                </button>}
                {task.archive === false &&
                <button className="panelBtn panelBtn--addOperation" onClick={handleChangeOpsFlag}><i
                    className="fas fa-plus"/></button>}
                {task.archive === false &&
                <button className="panelBtn panelBtn--archive" onClick={handleArchiveTask}><i
                    className="fas fa-archive"/>
                </button>}
            </div>
            {operationFormFlag && <form className="singleTask__addOps">
                <input type="text" placeholder="Nowa operacja" onChange={handleChangeOpValue}/>
                <button onClick={handleAddOperation}>Dodaj operację <span/></button>
            </form>}
            <ol className="singleTask__opsList">
                {
                    task.operations.map(el => (
                        <li><i className="fas fa-trash-alt" onClick={() => handleRemoveOperation(el)}/> {el}</li>
                    ))
                }
            </ol>
        </section>
    }
}
const mapStateToProps = state => ({
    username: state.currentUser.displayName
})
export default connect(mapStateToProps)(SingleTask)
// ()=>{
//     const array = task.operations;
//     const index = array.indexOf(el);
//     if (index > -1) {
//         array.splice(index, 1);
//     }
//     setTask(prev =>({
//         ...prev,
//         operations: array
//     }))
// }