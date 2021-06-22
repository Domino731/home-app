import {connect} from "react-redux";
import {useState} from "react";
import {addNewElement} from "../../functions/addNewElementToFirebase";

const NewTaskForm = ({username, showTasks}) => {
    const [task, setTask] = useState({title: "", description: "", operations: [], archive: false})
    const [successful, setSuccessful] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const handleChangeTask = (e) => {
        const {name, value} = e.target;
        setTask(prev => ({
            ...prev,
            [name]: value
        }))
        setInvalid(false)
    }
    const handleAddTask = (e) => {
        e.preventDefault();
        if (task.title.length > 0) {
           setSuccessful(true)
            setTimeout(()=>{
                showTasks()
            }, 2000)
            addNewElement(username, "ToDo", task)
        }
        else{
            setInvalid(true)
        }
        console.log(task.title.length)
    }
    return (

            <form className="newTaskForm">

                { successful === false && <>
                <h3 className="newTaskForm__title">Dodaj nowe zadanie</h3>
                <input type="text" className="newTaskForm__input newTaskForm__input--name" placeholder="*Tytuł zadania"
                       name="title" value={task.title} onChange={handleChangeTask} maxLength="30"/>
                <textarea className="newTaskForm__input newTaskForm__input--description" placeholder="Opis zadania"
                          name="description" value={task.description} onChange={handleChangeTask} maxLength="70"/>
                {invalid && <strong className="newTaskForm__invalid">*Podaj tytuł zadania</strong>}
                <button className="newTaskForm__btn"  onClick={handleAddTask} >Dodaj zadanie <span/></button></>}


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