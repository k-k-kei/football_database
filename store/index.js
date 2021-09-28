import { vuexfireMutations } from "vuexfire";
import firebase from "~/plugins/firebase";
import { auth } from "~/plugins/firebase";
import { firestoreAction } from "vuexfire";

const db = firebase.firestore();
const teamRef = db.collection("teams");

export const state = () => ({
  teams: [],

  //検索フォームに入力された値を格納する
  profileImage: "",
  teamInfo: "",
  teamLevel: "",
  teamArea: "",
});

export const mutations = {
  ...vuexfireMutations,

  //検索フォームに入力された値をstateに代入する関数
  selectName(state, name) {
    state.teamInfo = name;
  },
  selectLevel(state, level) {
    state.teamLevel = level;
  },
  selectArea(state, area) {
    state.teamArea = area;
  },
};

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef("teams", teamRef);
  }),

  add: firestoreAction(
    (context, { user_id, name, level, area, image, showImage }) => {
      console.log(user_id, level, area, image);

      // refの中身が保存する場所のpathになる
      if (image === "") {
        if (name.trim()) {
          teamRef.add({
            user_id: user_id,
            name: name,
            level: level,
            area: area,
            image:
              "https://firebasestorage.googleapis.com/v0/b/nuxt-project-aff05.appspot.com/o/teamProfileImages%2Famoung%20us.webp?alt=media&token=97f9a5f4-9fb4-4ada-95bf-feb098a47fc6",
            created: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      } else {
        const storageRef = firebase
          .storage()
          .ref(`teamProfileImages/${image.name}`);
        const uploadTask = storageRef.put(image);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          (error) => {
            console.log(error);
          },
          () => {
            storageRef.getDownloadURL().then((url) => {
              console.log(url);
              if (name.trim()) {
                teamRef.add({
                  user_id: user_id,
                  name: name,
                  level: level,
                  area: area,
                  image: url,
                  created: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
          }
        );
      }
    }
  ),

  update: firestoreAction(
    (context, { selectedTeamId, name, level, area, image }) => {
      console.log(selectedTeamId, name, level, area, image);

      if (image === "") {
        if (name.trim()) {
          teamRef.doc(selectedTeamId).update({
            name: name,
            level: level,
            area: area,
            updated: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      } else {
        // refの中身が保存する場所のpathになる
        const storageRef = firebase
          .storage()
          .ref(`teamProfileImages/${image.name}`);
        const uploadTask = storageRef.put(image);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          (error) => {
            console.log(error);
          },
          () => {
            storageRef.getDownloadURL().then((url) => {
              console.log(url);
              if (name.trim()) {
                teamRef.doc(selectedTeamId).update({
                  name: name,
                  level: level,
                  area: area,
                  image: url,
                  updated: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
          }
        );
      }
    }
  ),

  updateUser: firestoreAction(
    ({ context, redirect }, { loginName, email, image }) => {
      const user = firebase.auth().currentUser;
      console.log(loginName, email, image);

      //ユーザー名、プロフィール画像更新
      if (image === "") {
        user.updateProfile({
          displayName: loginName,
        });
      } else {
        user.updateProfile({
          displayName: loginName,
          photoURL: image.name,
        });

        // 画像をstorageに保存
        // refの中身が保存する場所のpathになる
        const storageRef = firebase
          .storage()
          .ref(`userProfileImages/${image.name}`);
        storageRef.put(image);
      }

      //email情報更新
      user
        .updateEmail(email)
        .then(() => {
          console.log("email更新成功");
        })
        .catch((error) => {
          console.log("email更新失敗", error);
          return redirect("/login");
        });
    }
  ),

  remove: firestoreAction((context, id) => {
    teamRef.doc(id).delete();
  }),
};

export const getters = {
  //@param: teamInfo（検索フォームへの入力値）
  //@return: 部分一致した検索結果
  filterdTeams: (state) => () => {
    
    //レベル選択肢を格納する配列
    let searchLevel = [];
    //エリア選択肢を格納する配列
    let searchArea = [];
    //フリーキーワードを格納する配列
    let searchFreeWords = [];

    //フリーキーワードの検索項目を配列にpush
    //初期値で""が入るため除外（searchFreeWordsのlengthの初期値を0にしたいため）
    state.teamInfo.split("　").forEach((el) => { if(state.teamInfo != "") return searchFreeWords.push(el)});
    //選択肢を配列にpush
    state.teamLevel.split("　").forEach((el) => { if(state.teamLevel != "") return searchLevel.push(el)});
    //選択肢を配列にpush
    state.teamArea.split("　").forEach((el) => { if(state.teamArea != "") return searchArea.push(el)});

    //AND条件の時の検索ロジック
    const andSearchResult = (array1, array2, array3) => {
      return state.teams.filter((team) => {
        return array1.concat(array2).concat(array3).every((el) => {
          return (
            team.name.indexOf(el) > -1 ||
            team.level.indexOf(el) > -1 ||
            team.area.indexOf(el) > -1
          );
        });
      });
    }

    //OR条件の時の検索ロジック
    const orSearchResult = (array1, array2, array3) => {
      return state.teams.filter((team) => {
        console.log(array1.concat(array2).concat(array3))
        return array1.concat(array2).concat(array3).some((el) => {
          return (
            team.name.indexOf(el) > -1 ||
            team.level.indexOf(el) > -1 ||
            team.area.indexOf(el) > -1
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
    if(countBlank === 3) return state.teams;
    if(countBlank > 1) return hasItem(searchFreeWords) === true ? andSearchResult(searchFreeWords, searchLevel, searchArea) : orSearchResult(searchFreeWords, searchLevel, searchArea);
    if(countBlank <= 1) return andSearchResult(searchFreeWords, searchLevel, searchArea); 
  },
};
