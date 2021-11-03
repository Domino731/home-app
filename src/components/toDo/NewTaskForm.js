import { useEffect, useState } from "react";
import { addNewElement } from "../../fireBase/addNewElementToFirebase";
import { auth } from "../../fireBase/fireBase";
let redirectTimeout = null;
/**
 * Component with form by which user can add new task into his account in firestore. 
 * @param showTasks - function that will show current list of tasks after successfully  new task
 */
const NewTaskForm = ({ showTasks }) => {

    //state with new task data
    const [task, setTask] = useState({ title: "", description: "", operations: [], archive: false })

    // flag to overlay animation
    const [successful, setSuccessful] = useState(false)

    // flag to display error and notify user about invalid passed data
    const [invalid, setInvalid] = useState(false)

    //  preventing unnecessary redirects - when uses has successfullu add new tasks then animation will be displayed 
    // and after 2s he will redirect to tasks list (TaskList component ) look in ToDo component
    useEffect(()=> {
       return clearTimeout(redirectTimeout);
    },[]);

    /** function that is changing task state */
    const handleChangeTask = (e) => {
        // update task state with new data
        const { name, value } = e.target;
        setTask(prev => ({
            ...prev,
            [name]: value
        }));

        // remove error
        return setInvalid(false);
    }

    //
    /** function that adds new task into user's account in firestore ('ToDo') subcollection */
    const handleAddTask = (e) => {
        e.preventDefault();

        // check if user has passed task title
        if (task.title.length > 0) {

            // display animation
            setSuccessful(true);

            // show tasks list with delay - 2s
            redirectTimeout = setTimeout(() => {
                return showTasks();
            }, 2000);

            // update data
            const data = task;
            data.added = new Date();
            return addNewElement(auth().currentUser.uid, "ToDo", data);
        }

        // when task has no name then change invalid state - display error
        else {
            return setInvalid(true);
        }
    }

    return <form className="newTaskForm">

        {/* form */}
        {successful === false && <>
            <h3 className="newTaskForm__title">Dodaj nowe zadanie</h3>
            <input type="text" className="newTaskForm__input newTaskForm__input--name" placeholder="*Tytuł zadania"
                name="title" value={task.title} onChange={handleChangeTask} maxLength="30" />
            <textarea className="newTaskForm__input newTaskForm__input--description" placeholder="Opis zadania"
                name="description" value={task.description} onChange={handleChangeTask} />

            {/*when user did not enter a task name show error*/}
            {invalid && <strong className="newTaskForm__invalid">*Podaj tytuł zadania</strong>}
            <button className="newTaskForm__btn" onClick={handleAddTask} >Dodaj zadanie <span /></button>
            </>}


        {/*when the user adds a task successfully the container with animation will be displayed */}
        {/*and after 2 second the list of tasks will be displayed*/}
        {successful && <div className="newTaskForm__successfulAdd">
            <h3>Dodano zadanie</h3>
            <i className="far fa-smile" />
        </div>}

    </form>
}

export default NewTaskForm