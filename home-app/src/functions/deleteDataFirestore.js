// deleting data from firestore
import {db} from "../fireBase/fireBase";

// params //
// dataId --> to delete specific element
// username --> to know where delete
// category --> to know in which category delete
export const deleteDataFirestore = (dataId, username, category) => {
     db.collection("users")
         .where(`userName`, `==`, `${username}`)
         .onSnapshot(querySnapshot => {
               querySnapshot.docs.map(doc =>
                  db.collection(`users/${doc.id}/${category}`)
                      .doc(`${dataId}`).delete()
              );
         })
}