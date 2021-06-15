import {db} from "../fireBase/fireBase";

export const deleteDataInFirestore = (DataId, username, item) => {
     console.log(DataId, username)
     db.collection("users")
         .where(`userName`, `==`, `${username}`)
         .onSnapshot(querySnapshot => {
              const id = querySnapshot.docs.map(doc =>
                  db.collection(`users/${doc.id}/${item}`)
                      .doc(`${DataId}`).delete()

              );
         })
}