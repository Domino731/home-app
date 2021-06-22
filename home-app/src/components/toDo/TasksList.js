import {connect} from "react-redux";
import SingleTask from "./TasksList_subcomponent--SingleTask";
import {Loading} from "../loading/Loading";

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