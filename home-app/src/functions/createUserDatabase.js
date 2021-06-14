
import {db} from "../fireBase/fireBase";

export const createUserDatabase = (userName) => {
    db.collection('users')
        .add({
            userName: userName
        })
    createData(userName)
}

const createData = (name) => {
    db.collection("users").where("userName", "==", `${name}`)
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => (doc.id));
            createCategories(data)
        })
}
const createCategories = (data) => {
    addCategory(data,"recipes")
    addCategory(data, "ToDo")
    addCategory(data, "kitchen")
}
const addCategory = (data, name) => {
    db.collection("users").doc(`${data[0]}`).collection(`${name}`).add({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}
