//this component displays single tasks, used in ToDo component
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteDataFirestore } from "../../fireBase/deleteDataFirestore";
import { auth } from "../../fireBase/fireBase";
import { updateDataFirestore } from "../../fireBase/updateDataFirestore";

// props //
// toDo --> specific task
// username --> username need for delete or update task
const SingleTask = ({ toDo }) => {

    //state with specific task
    const [task, setTask] = useState(toDo)

    //flag which shows new operation form
    const [operationFormFlag, setOperationFormFlag] = useState(false)

    //state holding new operation value
    const [operationValue, setOperationValue] = useState("")

    //array with task operations, which allows to add new operations
    const operations = task.operations

    //when task is update, update him in firestore
    useEffect(() => {
        updateDataFirestore(task.id, auth().currentUser.uid, "ToDo", task, () => null)
    }, [task])

    //function that delete task
    const handleDeleteTask = () => {
        deleteDataFirestore(task.id, auth().currentUser.uid, "ToDo")
    }

    //function that archive task
    const handleArchiveTask = () => {
        setTask(prev => ({
            ...prev,
            archive: true
        }));

    }

    //function that shows of hide new operation form
    const handleChangeOpsFlag = () => {
        if (operationFormFlag) {
            setOperationFormFlag(false)
        } else {
            setOperationFormFlag(true)
        }
    }

    //function that changing new operation value
    const handleChangeOpValue = e => {
        setOperationValue(e.target.value)
    }

    //function that adding new operation into task
    const handleAddOperation = e => {
        e.preventDefault()
        operations.push(operationValue)
        setTask(prev => ({
            ...prev,
            operations: operations
        }))
        setOperationFormFlag(false)
    }

    //function that remove operation
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
    }
    else {
        return <section className="singleTask">
            <span className="corner" />
            <h3 className="singleTask__title">{task.title}</h3>
            <div className="singleTask__description">{task.description}
            </div>
            <div className="singleTask__panel">

                {/*Delete button is displayed only if the number of operations in the task is 0*/}
                {task.operations.length === 0 || task.archive &&
                    <button className="panelBtn panelBtn--delete" onClick={handleDeleteTask}><i
                        className="fas fa-trash-alt" />
                    </button>}

                {/*These two buttons are only displayed when the job does not have archive status*/}
                {task.archive === false &&
                    <button className="panelBtn panelBtn--addOperation" onClick={handleChangeOpsFlag}><i
                        className="fas fa-plus" /></button>}
                {task.archive === false &&
                    <button className="panelBtn panelBtn--archive" onClick={handleArchiveTask}><i
                        className="fas fa-archive" />
                    </button>}


            </div>

            {/*add new operation*/}
            {operationFormFlag && <form className="singleTask__addOps">
                <input type="text" placeholder="Nowa operacja" onChange={handleChangeOpValue} />
                <button onClick={handleAddOperation}>Dodaj operację <span /></button>
            </form>}

            {/*rendering task operations*/}
            <ol className="singleTask__opsList">
                {
                    task.operations.map((el, num) => (
                        <li
                            key={`task${num}--${task.id}`}
                            >
                            {!task.archive && <i className="fas fa-trash-alt" onClick={() => handleRemoveOperation(el)}/>}
                            {el}
                        </li>
                    ))
                }
            </ol>

        </section>
    }
}

export default SingleTask
