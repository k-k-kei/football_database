import { vuexfireMutations } from "vuexfire";

export const mutations = {
  ...vuexfireMutations,
};

import firebase from "~/plugins/firebase";
import { firestoreAction } from "vuexfire";

const db = firebase.firestore();
const chatsRef = db.collection("chats");

export const state = () => ({
  chats: [],
});

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef("chats", chatsRef);
  }),

  makeChatRoom: firestoreAction((context, { uid, other_id, team_id }) => {
    chatsRef.add({
      uid: uid,
      other_id: other_id,
      team_id: team_id,
      unReadMessage: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }),

  add: firestoreAction((context, { docId, message, uid, read }) => {
    if (message.trim()) {
      chatsRef
        .doc(docId)
        .collection("message")
        .doc()
        .set({
          message: message,
          uid: uid,
          read: read,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      chatsRef.doc(docId).update({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }),

  setLatestMessage: firestoreAction((context, { docId, latestMessage }) => {
    chatsRef.doc(docId).set(
      {
        latestMessage: latestMessage,
      },
      { merge: true }
    );
  }),

  setUnreadFlag: firestoreAction((context, { docId, unReadMessage }) => {
    chatsRef.doc(docId).update({
      unReadMessage: unReadMessage,
    });
  }),

  setReadFlag: firestoreAction((context, { docId, subDocId }) => {
    chatsRef
      .doc(docId)
      .collection("message")
      .doc(subDocId)
      .update({
        read: true,
      });
  }),

  remove: firestoreAction((context, id) => {
    chatsRef.doc(id).delete();
  }),
};
