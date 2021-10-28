//component responsible for the form to add new tasks, is used in ToDo component
import {connect} from "react-redux";
import {useState} from "react";
import {addNewElement} from "../../fireBase/addNewElementToFirebase";
import { auth } from "../../fireBase/fireBase";

// props //
// username --> username for add new task addNewElementFunction
// showTasks --> function which will show the current list of tasks after adding them successfully
const NewTaskForm = ({username, showTasks}) => {

    //state with new task
    const [task, setTask] = useState({title: "", description: "", operations: [], archive: false})

    //flag to overlay animation
    const [successful, setSuccessful] = useState(false)

     //flag to display error
    const [invalid, setInvalid] = useState(false)

    //function that changes new task state
    const handleChangeTask = (e) => {
        const {name, value} = e.target;
        setTask(prev => ({
            ...prev,
            [name]: value
        }))
        setInvalid(false)
    }

    //function that adds new task
    const handleAddTask = (e) => {
        e.preventDefault();
        // when task has name
        if (task.title.length > 0) {
           setSuccessful(true)
            setTimeout(()=>{
                showTasks()
            }, 2000)
            addNewElement(auth().currentUser.uid, "ToDo", task)
        }
        // when task has no name set error
        else{
            setInvalid(true)
        }
    }

    return (
            <form className="newTaskForm">
                { successful === false && <>
                <h3 className="newTaskForm__title">Dodaj nowe zadanie</h3>
                <input type="text" className="newTaskForm__input newTaskForm__input--name" placeholder="*Tytuł zadania"
                       name="title" value={task.title} onChange={handleChangeTask} maxLength="30"/>
                <textarea className="newTaskForm__input newTaskForm__input--description" placeholder="Opis zadania"
                          name="description" value={task.description} onChange={handleChangeTask} maxLength="70"/>

                    {/*when user did not enter a task name show error*/}
                {invalid && <strong className="newTaskForm__invalid">*Podaj tytuł zadania</strong>}
                <button className="newTaskForm__btn"  onClick={handleAddTask} >Dodaj zadanie <span/></button></>}


                {/*when the user adds a task successfully the information will be displayed */}
                {/*and after some time the current list of tasks will be displayed*/}
                {successful && <div className="newTaskForm__successfulAdd">
                    <h3>Dodano zadanie</h3>
                    <i className="far fa-smile"/>
                </div>}
            </form>
    )
}


const mapStateToProps = (state) => (
    {
        username: state.currentUser.displayName
    }
)
export default connect(mapStateToProps)(NewTaskForm)