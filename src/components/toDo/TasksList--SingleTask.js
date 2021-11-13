//this component displays single tasks, used in ToDo component
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteDataFirestore } from "../../fireBase/deleteDataFirestore";
import { auth } from "../../fireBase/fireBase";
import { updateDataFirestore } from "../../fireBase/updateDataFirestore";
import { formatDate } from "../../functions/formatDate";
import { setToDos } from "../../redux/actions/firebaseData.actions";
import { getDataFromFirestore } from "../../fireBase/getDataFromFirestore";
/**
 * Component for single task, which is including task overview (title, description...), operations
 * and panel bar by which user can manage particular task delete, archive, or add new operation
 * Task can be only deleted if he has no operations or if he is archived
 * @param taskData - object with data about single tasks
 */
const SingleTask = ({ taskData }) => {

    // state with specific task data 
    const [task, setTask] = useState(taskData);

    // flag which allows to toogle tasks operations list
    const [operationFormFlag, setOperationFormFlag] = useState(false);

    // state holding new operation text
    const [operationValue, setOperationValue] = useState("");

    //array with task operations, which allows to add new operations or remove the specific one
    const operations = task.operations

    // when task is update, update him in firestore
    useEffect(() => {
        return updateDataFirestore(taskData.id, auth().currentUser.uid, "ToDo", task, () => null);
    }, [task]);

    /**
     * function that delete task from user's account in firestore
     */
    const handleDeleteTask = () => {
       return deleteDataFirestore(taskData.id, auth().currentUser.uid, "ToDo")
    };

    /** function that archive task, so user cant add new operation, he can only delete */
    const handleArchiveTask = () => {
        return setTask(prev => ({
            ...prev,
            archive: true
        }));
    };

    /** by this function user can open form with new operation  */
    const handleChangeOpsFlag = () => operationFormFlag ? setOperationFormFlag(false) : setOperationFormFlag(true);

    /** function that is changing newOperationValue state */
    const handleChangeOpValue = e => setOperationValue(e.target.value);

    /** function that is adding new operation into task */
    const handleAddOperation = e => {
        e.preventDefault();

        // add new operation
        operations.push(operationValue);

        // update task state -> useEffect will update him in firestore
        setTask(prev => ({
            ...prev,
            operations: operations
        }));

        // hide operation form 
        setOperationFormFlag(false);
    };

    /**
     * Remove specific operation from task
     * @param {string} content - text of operation
     */
    const handleRemoveOperation = content => {

        // remove operation from task
        const array = taskData.operations;
        const index = array.indexOf(content);
        if (index > -1) {
            array.splice(index, 1);
        };

        // update task state -> useEffect will update him in firestore
        setTask(prev => ({
            ...prev,
            operations: array
        }));
    };

    return <section className="singleTask">
        <span className="corner" />

        {/* overview - added date, title, description */}
        <div className='singleTask__titleScale'>
            <div className="singleTask__date" title='Data dodania'>{formatDate(taskData.added)}</div>
            <h3 className="singleTask__title">{taskData.title}</h3>
            <p className="singleTask__description">{taskData.description}
            </p>
        </div>

        {/* panel with button by which user can manage his task */}
        <div className="singleTask__panel">

            {/*Delete button is displayed only if task doesnt have operations or if tasks is archive*/}
            {(taskData.operations.length === 0 || taskData.archive) &&
                <button className="panelBtn panelBtn--delete" onClick={handleDeleteTask} title='Usuń te zadanie'><i
                    className="fas fa-trash-alt" />
                </button>}

            {/*These two buttons are only displayed when the task doesnt have archive status*/}
            {/* add new operation button */}
            {!taskData.archive &&
                <button className="panelBtn panelBtn--addOperation" onClick={handleChangeOpsFlag} title='Dodaj nową operację'><i
                    className="fas fa-plus" /></button>}

            {/* archive task button */}
            {!taskData.archive &&
                <button className="panelBtn panelBtn--archive" onClick={handleArchiveTask} title='Archiwizuj te zadanie'><i
                    className="fas fa-archive" />
                </button>}

        </div>

        {/*add new operation*/}
        {(operationFormFlag && !taskData.archive) && <form className="singleTask__addOps">
            <textarea type="text" placeholder="Opisz nową operacja" onChange={handleChangeOpValue} />
            <button onClick={handleAddOperation}>Dodaj operację <span /></button>
        </form>}

        {/*rendering task operations*/}
        <ol className="singleTask__opsList">
            {
                taskData.operations.map((el, num) => (
                    <li key={`task-${num}-${taskData.id}`} >

                        {/* button by which user can remove operation, this button is displaying only when tasks isnt archived */}
                        {!taskData.archive && <button className="clearButton"><i className="fas fa-trash-alt"
                            onClick={() => handleRemoveOperation(el)}
                            title='Usuń operacje'
                        /></button>}

                        {/* content */}
                        - {el}
                    </li>
                ))
            }
        </ol>

    </section>
};
const mapDispatchToProps = dispatch => ({
    setToDos: data => dispatch(setToDos(data))
});
export default connect(null, mapDispatchToProps)(SingleTask);
