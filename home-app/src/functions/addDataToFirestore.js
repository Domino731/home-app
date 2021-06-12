import {db} from "../fireBase/fireBase";

export const addDataToFirestore = () => {
       // db.collection("products").doc("7o5dtdGeufqxiKlnV9Hy").collection("dfg")
    db.collection("products/7o5dtdGeufqxiKlnV9HY/dfg")
            .add({
                amount: 12,
                name: "kurczka",
                userKey: "k4plksd"
            })
}

// import {db} from "../fireBase/fireBase";
//
// export const addDataToFirestore = () => {
//     if(db){
//         db.collection("products")
//             .add({
//                 amount: 12,
//                 name: "kurczka",
//                 userKey: "k4plksd"
//             })
//     }
// }