import { db } from "./fireBase";
const today = new Date().toLocaleDateString()

//creating new user database in firestore(collection users)
// params //
// userName --> name it will be created with
export const createUserDatabase = (uid) => {
        addCategory(uid, "recipes")
        addCategory(uid, "ToDo")
        addCategory(uid, "products")
}


//creating first doc
// params //
// id --> to function know where push first doc
// name --> name of collection, to which you want add new doc

const addCategory = async (id, name) => {
    await db.collection("users").doc(`${id}`).collection(`${name}`).doc().set({
        firstDoc: today
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}








// import { db } from "./fireBase";
// const today = new Date().toLocaleDateString()

// //creating new user database in firestore(collection users)
// // params //
// // userName --> name it will be created with
// export const createUserDatabase = (uid) => {
//     db.collection('users')
//         .add({
//             createdAt: new Date()
//         })
//     createData(uid)
// }

// //creating new doc in firestore(collection users)
// // params //
// // name --> to get id of current user
// const createData = (uid) => {
//     addCategory(uid,"recipes")
//     addCategory(uid, "ToDo")
//     addCategory(uid, "products")
// }

// //creating first doc
// // params //
// // id --> to function know where push first doc
// // name --> name of collection, to which you want add new doc

// const addCategory = (id, name) => {
//     db.collection("users").doc(`${id}`).collection(`${name}`).add({
//        firstDoc: today
//     })
//         .then(() => {
//             console.log("Document successfully written!");
//         })
//         .catch((error) => {
//             console.error("Error writing document: ", error);
//         });
// }