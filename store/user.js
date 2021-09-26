import { vuexfireMutations } from "vuexfire";

export const mutations = {
  ...vuexfireMutations,
};

import firebase from "~/plugins/firebase";
import { firestoreAction } from "vuexfire";

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  users: "",
});

export const actions = {
  userInit: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef("users", usersRef);
  }),

  makeUserInfo: firestoreAction((context, { uid, displayName }) => {
    console.log(uid, displayName);
    usersRef.add({
      uid: uid,
      displayName: displayName,
    });
  }),

  updateUserImage: firestoreAction((context, { docId, profileImage }) => {
    console.log(docId, profileImage);
    // usersRef.doc(docId).set({
    //     profileImage: profileImage,
    // }, { merge: true });
    if (profileImage === "") {
      console.log("画像の変更はありません");
    } else {
      // refの中身が保存する場所のpathになる
      const storageRef = firebase
        .storage()
        .ref(`userProfileImages/${profileImage.name}`);
      const uploadTask = storageRef.put(profileImage);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        null,
        (error) => {
          console.log(error);
        },
        () => {
          storageRef.getDownloadURL().then((url) => {
            usersRef.doc(docId).set(
              {
                profileImage: url,
              },
              { merge: true }
            );
          });
        }
      );
    }
  }),
};
