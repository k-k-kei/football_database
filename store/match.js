import { vuexfireMutations } from "vuexfire";

export const mutations = {
  ...vuexfireMutations
};

import firebase from "~/plugins/firebase";
import { firestoreAction } from "vuexfire";

const db = firebase.firestore();
const matchesRef = db.collection("matches");

export const state = () => ({
  matches: [],
});

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef("matches", matchesRef);
  }),

  add: firestoreAction((context, { teamId, datetime, title, place, comment }) => {
    console.log(teamId);
    matchesRef.add({
        teamId: teamId,
        datetime: datetime,
        title: title,
        place: place,
        comment: comment,
        flag: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }),

  addAnswer: firestoreAction((context, { docId, teamId, answers }) => {
    console.log(docId, teamId, answers);
    matchesRef.doc(docId).collection("answers").doc(teamId).set({
        answer: answers,
    }, {merge: true})
    //回答を反映するために回答後リロードをかませる。
    .then(() => location.reload())
  }),

    matchConfirm: firestoreAction((context, { docId,  confirmationInfo }) => {
    console.log(docId, confirmationInfo);
    matchesRef.doc(docId).set({
        confirmDate: confirmationInfo.datetime,
        title: confirmationInfo.title,
        place: confirmationInfo.place,
        comment: confirmationInfo.comment,
        flag: 1,
    }, {merge: true})
  }),
};
