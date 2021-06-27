//ToDo component that displays a list of tasks to do or a form to submit a new task
//which renders the component

import {ToDoBar} from "./ToDoBar";
import {useState} from "react";
//components
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TasksList";
const ToDo = () => {
    //flag which shows NewTaskForm or TaskList
    const [flag, setFlag] = useState(false)

    //function that show displayed element
    const handleChangeFlag = () => {
        if (flag) {
            setFlag(false)
        } else {
            setFlag(true)
        }
    }
    return (
        <section className="container toDo">
            <ToDoBar/>
            <div className="tasks">
                <div className="tasks__choice" onClick={handleChangeFlag}><h2>{
                    flag ? "Pokaż zadania" : "Dodaj zadanie"
                }</h2>
                </div>
                    {  flag ? <NewTaskForm showTasks={handleChangeFlag}/>: <TaskList/>}
            </div>
        </section>
    )


}
export default ToDo
