import { connect } from "react-redux";
import { Loading } from "../loading/Loading";
import SingleTask from "./TasksList--SingleTask";

/**
 * Component which is reponsible for list with all user tasks 
 * @param tasks - REDUX STATE - array with data about user's tasks 
 */
const TaskList = ({ tasks }) => {

    // wait for data
    if (tasks !== null) {
        return <section className="tasksList">
            {tasks.length > 0 && tasks.map((el, num) => <SingleTask toDo={el} key={`task_${num}`} />)}
        </section>
    }
    else {
        return <Loading />
    }
}

// REDUX
const mapStateToProps = state => ({
    tasks: state.toDo
});
export default connect(mapStateToProps)(TaskList);