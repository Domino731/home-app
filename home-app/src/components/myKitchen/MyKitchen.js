import MyKitchenBar from "./MyKitchenBar";
import MyKitchenCategory from "./MyKitchenCategory";

export const MyKitchen = () => {

    return (
        <section className="container">
            <MyKitchenBar/>
            <MyKitchenCategory title="Warzywa" productType={"vegetables"}/>
            <MyKitchenCategory title="Mięso" productType={"meat"}/>
            <MyKitchenCategory title="Nabiał" productType={"dairy"}/>
            <MyKitchenCategory title="Cukry" productType={"sugar"}/>
            <MyKitchenCategory title="Owoce" productType={"fruit"}/>
            <MyKitchenCategory title="Mrożonki" productType={"frozenFood"}/>
            <MyKitchenCategory title="Napoje" productType={"drinks"}/>
            <MyKitchenCategory title="Inne" productType={"others"}/>
        </section>
    )
}

