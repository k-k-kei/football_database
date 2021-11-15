import { vuexfireMutations } from "vuexfire";

export const mutations = {
  ...vuexfireMutations
};

import firebase from "~/plugins/firebase";
import { firestoreAction } from "vuexfire";

const db = firebase.firestore();
const approvalsRef = db.collection("approvals");
// const ticketsChats = 

export const state = () => ({
  chats: []
});

export const actions = {
    add: firestoreAction((context, { ticketId, participant }) => {
    approvalsRef.doc(ticketId).set({
        ticketId: ticketId,
        participant: participant,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
  }),

  showChats: firestoreAction(({ bindFirestoreRef }, { docId }) => {
    bindFirestoreRef("chats", approvalsRef.doc(docId).collection("chats").orderBy("timestamp", "asc"));
  }),

  chatAdd: firestoreAction((context, { docId, message, uid, read }) => {
    if (message.trim()) {
      approvalsRef
        .doc(docId)
        .collection("chats")
        .doc()
        .set({
          message: message,
          uid: uid,
          read: read,
          flag: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    }),

    complateActivity: firestoreAction((context, { docId }) => {
      approvalsRef.doc(docId).set({
        flag: 1,
    }, { merge: true });
    })
}