import { vuexfireMutations } from "vuexfire";

import firebase from "~/plugins/firebase";
import { firestoreAction } from "vuexfire";

const db = firebase.firestore();
const ticketsRef = db.collection("tickets");

export const state = () => ({
  tickets: [],
  chats: [],

  ticketInfo: "",
  ticketLevel: "",
  ticketArea: "",
});

export const mutations = {
  ...vuexfireMutations,

  //検索フォームに入力された値をstateに代入する関数
  selectName(state, name) {
    state.ticketInfo = name;
  },
  selectLevel(state, level) {
    state.ticketLevel = level;
  },
  selectArea(state, area) {
    state.ticketArea = area;
  },
};

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef("tickets", ticketsRef);
  }),

  add: firestoreAction((context, { uid, datetime, title, category, level, time, area, place, comment }) => {
    ticketsRef.add({
        uid: uid,
        datetime: datetime,
        title: title,
        category: category,
        level: level,
        time: time,
        area: area,
        place: place,
        comment: comment,
        flag: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }),

    update: firestoreAction((context, { docId }) => {
    ticketsRef.doc(docId).set({
        flag: 1
    }, {merge: true});
  }),

    chatAdd: firestoreAction((context, { docId, message, uid, read }) => {
    if (message.trim()) {
      ticketsRef
        .doc(docId)
        .collection("chats")
        .doc()
        .set({
          message: message,
          uid: uid,
          read: read,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    //   ticketsRef.doc(docId).update({
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   });
    }
  }),

    showChats: firestoreAction(({ bindFirestoreRef }, { docId }) => {
    bindFirestoreRef("chats", ticketsRef.doc(docId).collection("chats").orderBy("timestamp", "asc"));
  }),
};

export const getters = {

  //@param: teamInfo（検索フォームへの入力値）
  //@return: 部分一致した検索結果
  filterdTickets: (state) => () => {
    
    //レベル・エリア・フリーキーワード選択肢を格納する配列
    let searchLevel = [];
    let searchArea = [];
    let searchFreeWords = [];

    //フリーキーワードの検索項目を配列にpush
    //初期値で""が入るため除外（searchFreeWordsのlengthの初期値を0にしたいため）
    state.ticketInfo.split("　").forEach((el) => { if(state.ticketInfo != "") return searchFreeWords.push(el)});
    state.ticketLevel.split("　").forEach((el) => { if(state.ticketLevel != "") return searchLevel.push(el)});
    state.ticketArea.split("　").forEach((el) => { if(state.ticketArea != "") return searchArea.push(el)});

    //AND条件の時の検索ロジック
    const andSearchResult = (array1, array2, array3) => {
      return state.tickets.filter((ticket) => {
        return array1.concat(array2).concat(array3).every((el) => {
          return (
            ticket.level.indexOf(el) > -1 ||
            ticket.area.indexOf(el) > -1||
            ticket.title.indexOf(el) > -1
          );
        });
      });
    }

    //OR条件の時の検索ロジック
    const orSearchResult = (array1, array2, array3) => {
      return state.tickets.filter((ticket) => {
        console.log(array1.concat(array2).concat(array3))
        return array1.concat(array2).concat(array3).some((el) => {
          return (
            ticket.level.indexOf(el) > -1 ||
            ticket.area.indexOf(el) > -1||
            ticket.title.indexOf(el) > -1
          );
        });
      });
    }

    //3つある検索フォームのうち空白の数をカウント
    const hasItem = array => array.length > 0;
    const countBlank = [hasItem(searchFreeWords), hasItem(searchLevel), hasItem(searchArea)].filter(el => el === false).length;

    //もし3つとも空白ならチーム情報全てを返す。
    //2つ以上空白が残っていれば単一検索としてOR条件で、それ以下の場合はAND条件で検索
    //※フリーキーワードのみの検索の場合はAND条件で検索
    console.log(countBlank)
    if(countBlank === 3) return state.tickets;
    if(countBlank > 1) return hasItem(searchFreeWords) === true ? andSearchResult(searchFreeWords, searchLevel, searchArea) : orSearchResult(searchFreeWords, searchLevel, searchArea);
    if(countBlank <= 1) return andSearchResult(searchFreeWords, searchLevel, searchArea); 
  },
};
