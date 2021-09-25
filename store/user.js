import { vuexfireMutations } from "vuexfire";

export const mutations = {
  ...vuexfireMutations
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
};
