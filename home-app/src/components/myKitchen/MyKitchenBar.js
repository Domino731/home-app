import {connect} from "react-redux";


const MyKitchenBar = ({asd}) => {
    console.log(asd)
    return (
        <section>
            <div className="kitchenBar"  >
                <h1>Lodówka</h1><h1>Lodówka</h1>
                <span/>
                <span/>
            </div>
            <h1>{JSON.stringify(asd)}</h1>
        </section>
    )
}
const mapStateToProps = state => ({
    asd: state.products
})
export default connect(mapStateToProps)(MyKitchenBar)