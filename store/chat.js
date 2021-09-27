import { vuexfireMutations } from "vuexfire";

export const mutations = {
  ...vuexfireMutations
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

  makeChatRoom: firestoreAction((context, { uid, other_id, team_id, team_name, chat_required_team }) => {
    chatsRef.add({
        uid: uid,
        other_id: other_id,
        team_id: team_id,
        team_name: team_name,
        chat_required_team: chat_required_team,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }),

  add: firestoreAction((context, { docId, message, uid, read}) => {
    console.log(docId, message, uid, read);
    if (message.trim()) {
      chatsRef.doc(docId).collection("message").doc().set({
          message: message,
          uid: uid,
          read: read,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }),

  setReadFlag: firestoreAction((context, { docId, subDocId }) => {
    console.log(docId, subDocId);
    chatsRef.doc(docId).collection("message").doc(subDocId).update({
        read: true,
    });
    console.log("store内で変更完了")
  }),

  remove: firestoreAction((context, id) => {
    chatsRef.doc(id).delete();
  }),
  
};
