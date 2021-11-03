import { ToDoHeader } from "./ToDoHeader";
import { useState } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TasksList";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setToDos } from "../../redux/actions/firebaseData.actions";
import { getDataFromFirestore } from "../../fireBase/getDataFromFirestore";
import { auth } from "../../fireBase/fireBase";

/**
 * Main component for tasks section, responsbile for fetching data about tasks and saving
 *  it into redux state (toDo state), and for rendering header, new task form and tasks list
 * @param  setToDos - REDUX ACTION - function needed to set toDo state in redux in order to render list with tasks based on this data
 */
const ToDo = ({ setToDos }) => {

    /** flag by which user can toggling between tasks list and new task form */
    const [flag, setFlag] = useState(false);

    // fetch data about tasks from firestore and save this incomming data into redux state - toDo state
    useEffect(() => {
        return auth().onAuthStateChanged(user => {
            user && getDataFromFirestore('ToDo', user.uid, setToDos);
        });
    }, []);

    /** function that is changing flag state, so user can toogle between tasks list and new task form */
    const handleChangeFlag = () => flag ? setFlag(false) : setFlag(true);



    return (
        <section className="container container--menu toDo">
            {/* header */}
            <ToDoHeader />

            <div className="tasks">
                {/* container by which user can toggle content */}
                <div className="tasks__choice"
                    onClick={handleChangeFlag}
                    title={flag ? 'Pokaż wszystkie zadania' : 'Dodaj nowe zadanie'}>
                    <h2>{
                        flag ? "Pokaż zadania" : "Dodaj zadanie"
                    }</h2>
                </div>

                {/* according to flag state display appropriate content,*/}
                {flag ? <NewTaskForm showTasks={handleChangeFlag} /> : <TaskList />}
            </div>

        </section>
    )


}

///////// REDUX ////////////////////////
const mapDispatchToProps = dispatch => ({
    setToDos: data => dispatch(setToDos(data))
});
export default connect(null, mapDispatchToProps)(ToDo);
