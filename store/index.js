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
  teamInfo: ""
});

export const mutations = {
  ...vuexfireMutations,

  //検索フォームに入力された値をstateに代入する関数
  selectName(state, name) {
    state.teamInfo = name;
    console.log(state.teamInfo);
  }
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
              created: firebase.firestore.FieldValue.serverTimestamp()
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
          error => {
            console.log(error);
          },
          () => {
            storageRef.getDownloadURL().then(url => {
              console.log(url);
              if (name.trim()) {
                teamRef.add({
                  user_id: user_id,
                  name: name,
                  level: level,
                  area: area,
                  image: url,
                  created: firebase.firestore.FieldValue.serverTimestamp()
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

      if(image === ""){
            if (name.trim()) {
              teamRef
                .doc(selectedTeamId)
                .update({
                  name: name,
                  level: level,
                  area: area,
                  updated: firebase.firestore.FieldValue.serverTimestamp()
                })
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
          error => {
            console.log(error);
          },
          () => {
            storageRef.getDownloadURL().then(url => {
              console.log(url);
              if (name.trim()) {
                teamRef
                  .doc(selectedTeamId)
                  .update({
                    name: name,
                    level: level,
                    area: area,
                    image: url,
                    updated: firebase.firestore.FieldValue.serverTimestamp()
                  })
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
          displayName: loginName
        });
      } else {
        user.updateProfile({
          displayName: loginName,
          photoURL: image.name
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
        .catch(error => {
          console.log("email更新失敗", error);
          return redirect("/login");
        });
    }
  ),

  remove: firestoreAction((context, id) => {
    teamRef.doc(id).delete();
  })
};

export const getters = {
  //@param: teamInfo（検索フォームへの入力値）
  //@return: 部分一致した検索結果
  filterdTeams: state => teamInfo => {
    // return state.teams.filter(el => {
    //   return el.name.indexOf(teamInfo) > -1 ||
    //   el.level.indexOf(teamInfo) > -1 ||
    //   el.area.indexOf(teamInfo) > -1
    // });

    let searchWords = teamInfo.split("　");

    const searchResult = state.teams.filter(team => {
         return  searchWords.every(el => {
              return team.name.indexOf(el) > -1 ||
              team.level.indexOf(el) > -1 ||
              team.area.indexOf(el) > -1
          })
    })
    return searchResult;

  },

};
