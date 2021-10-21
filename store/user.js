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

  updateUserInfo: firestoreAction((context, { docId, displayName }) => {
    console.log(docId, displayName);
    usersRef.doc(docId).set(
      {
        displayName: displayName,
      },
      { merge: true }
    );
  }),

  updateUserImage: firestoreAction(
    (context, { docId, displayName, profileImage }) => {
      console.log(docId, displayName, profileImage);
      // usersRef.doc(docId).set({
      //     profileImage: profileImage,
      // }, { merge: true });
      if (profileImage === "") {
        console.log("画像の変更はありません");
        usersRef.doc(docId).set(
          {
            displayName: displayName,
          },
          { merge: true }
        );
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
                  displayName: displayName,
                  profileImage: url,
                },
                { merge: true }
              );
            });
          }
        );
      }
    }
  ),

  addTeamInfo: firestoreAction((context, { docId, teams }) => {
    console.log(docId, teams);
    usersRef.doc(docId).set(
      {
        teams: teams,
      },
      { merge: true }
    );
  }),
};
