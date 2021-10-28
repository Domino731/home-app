import {ToDoBar} from "./ToDoBar";
import {useState} from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TasksList";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setToDos } from "../../redux/actions/firebaseData.actions";
import { getDataFromFirestore } from "../../fireBase/getDataFromFirestore";
import { auth } from "../../fireBase/fireBase";
const ToDo = ({setToDos}) => {

    //flag which shows NewTaskForm or TaskList
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                getDataFromFirestore('ToDo', user.uid, setToDos)
            } 
        })   
    }, []);

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
                <div className="tasks__choice"
                 onClick={handleChangeFlag} 
                 title={flag ? 'Pokaż wszystkie zadania' : 'Dodaj nowe zadanie'}>
                     <h2>{
                    flag ? "Pokaż zadania" : "Dodaj zadanie"
                }</h2>
                
                </div>
                    {  flag ? <NewTaskForm showTasks={handleChangeFlag}/>: <TaskList/>}
                 </div>
        </section>
    )


}
const mapDispatchToProps = dispatch => ({
    setToDos: data => dispatch(setToDos(data))
})
export default connect(null, mapDispatchToProps)(ToDo)
