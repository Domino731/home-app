

// const MyKitchenBar = () => {
//     return (
//         <section>
//             <div className="kitchenBar"  >
//                 <h1>Lodówka</h1><h1>Lodówka</h1>
//                 <span/>
//                 <span/>
//             </div>
//
//         </section>
//     )
// }
//
// export default (MyKitchenBar)

import {connect} from "react-redux";


const MyKitchenBar = ({x,y,z, o}) => {
    console.log(x)
    return (
        <section>
            <div className="kitchenBar"  >
                <h1>Lodówka</h1><h1>Lodówka</h1>
                <span/>
                <span/>
            </div>
            <h1>{JSON.stringify(x)}</h1>
            {/*<h2>{JSON.stringify(y)}</h2>*/}
            {/*<h3>{JSON.stringify(z)}</h3>*/}
            {/*<h4>{JSON.stringify(o)}</h4>*/}
        </section>
    )
}
const mapStateToProps = state => ({
    x: state.products,
    y: state.recipes,
    z: state.toDo,
    o: state.currentUser.displayName

})
export default connect(mapStateToProps)(MyKitchenBar)