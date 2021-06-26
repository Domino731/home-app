import {db} from "../fireBase/fireBase";
const today = new Date().toLocaleDateString()

//creating new user database in firestore(collection users)
// params //
// userName --> name it will be created with
export const createUserDatabase = (userName) => {
    db.collection('users')
        .add({
            userName: userName
        })
    createData(userName)
}

//creating new doc in firestore(collection users)
// params //
// name --> to get id of current user
const createData = (name) => {
    db.collection("users").where("userName", "==", `${name}`)
        .onSnapshot(querySnapshot => {
            const id = querySnapshot.docs.map(doc => (doc.id));
            createCategories(id)
        })
}


//creating collections in new created user(recipes, ToDo, products)
// params //
// id --> to function know where push new collections
const createCategories = (id) => {
    addCategory(id,"recipes")
    addCategory(id, "ToDo")
    addCategory(id, "products")
}

//creating first doc
// params //
// id --> to function know where push first doc
// name --> name of collection, to which you want add new doc
const addCategory = (id, name) => {
    db.collection("users").doc(`${id[0]}`).collection(`${name}`).add({
       firstDoc: today
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}
