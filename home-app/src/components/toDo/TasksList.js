//component containing all tasks
import {connect} from "react-redux";
import {Loading} from "../loading/Loading";
//components
import SingleTask from "./TasksList_subcomponent--SingleTask";

// props //
// tasks --> array with task form application state, which renders the  SingleTask component
const TaskList = ({tasks}) => {
    if(tasks !== null) {
        return (
            <section className="tasksList">
                {tasks.map((el, num) =><SingleTask toDo={el} key={`task_${num}`}/>)}
            </section>
        )
    }
    else{
        return <Loading/>
    }
}
const mapStateToProps = state => ({
    tasks: state.toDo
})
export default connect(mapStateToProps)(TaskList)