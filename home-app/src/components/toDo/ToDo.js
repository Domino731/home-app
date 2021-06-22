import NewTaskForm from "./NewTaskForm";
import {ToDoBar} from "./ToDoBar";
import {useState} from "react";
import TaskList from "./TasksList";
const ToDo = () => {
    const [flag, setFlag] = useState(false)
    const handleChangeFlag = () => {
        if (flag) {
            setFlag(false)
        } else {
            setFlag(true)
        }
    }
    return (
        <section className="container">
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
