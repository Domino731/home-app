import {connect} from "react-redux";
import {useEffect} from "react";

const MyKitchenBar = (currentUser, name) => {
    useEffect(()=>{
        console.log(currentUser)
        console.log(name)
    }, [])
    return (
        <section>
            <div className="kitchenBar"  >
                <h1>Lodówka</h1><h1>Lodówka</h1>
                <span/>
                <span/>
            </div>
        </section>
    )
}
const mapStateToProps = state => ({
    currentUser: state.currentUser
})
export default connect(mapStateToProps)(MyKitchenBar)