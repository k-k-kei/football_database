<template>
  <div>
    <div
      class="
        flex flex-col
        items-center
        justify-center
        w-screen
        min-h-screen
        bg-gray-100
        text-gray-800
      "
    >
      <div
        class="
          relative
          flex flex-col flex-grow
          w-full
          max-w-xl
          bg-white
          shadow-xl
          rounded-lg
          overflow-hidden
          overscroll-auto
        "
      >
        <div
          id="top"
          v-for="user in users"
          :key="user.id"
          class="flex flex-col flex-grow h-0 mb-28 p-7 overflow-auto"
        >
          <!-- テキスト -->
          <div
            :class="[
              chat.uid === chatData.uid ? myMessageShape : othersMessageShape,
            ]"
            v-for="chat in chats"
            :key="chat.id"
          >
            <div v-if="chat.uid != chatData.uid">
              <nuxt-link :to="'/userPage/' + user.uid">
              <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                <img class="h-10 w-10 rounded-full" :src="user.profileImage" alt="" />
              </div>
              </nuxt-link>
            </div>
            <div>
              <div
                :class="[chat.uid === chatData.uid ? myMessage : othersMessage]"
              >
                <p class="text-sm">
                  {{ chat.message }}
                </p>
              </div>

              <!-- 送信時間表示 -->
              <!-- チャット入力と同時に表示されるため、toDateの中身がnullになってエラーとなってしまう。 -->
              <!-- チャット入力後、timestampの値を受け取って時刻表示形式に直せばエラーは収まるはず。 -->
              <span class="text-xs text-gray-500 leading-none">{{
                chat.timestamp.toDate().getMonth().toString().padStart(2, "0") + "/" +
                chat.timestamp.toDate().getDate().toString().padStart(2, "0") + " " +
                chat.timestamp.toDate().getHours().toString().padStart(2, "0") + ":" +
                chat.timestamp.toDate().getMinutes().toString().padStart(2, "0")
              }}</span>
            </div>
          </div>
        </div>
        <!-- テキストここまで -->

        <!-- 送信フォーム -->
        <div class="fixed w-full bottom-0 bg-gray-400 p-4">
          <div class="flex w-full">
            <input
              type="text"
              class="flex items-center h-10 w-10/12 rounded px-3 text-sm"
              placeholder="Type your message…"
              v-model="chatData.message"
            />
            <button class="flex w-2/12 mt-3" @click="add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- 送信フォームここまで -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { auth } from "~/plugins/firebase";

const db = firebase.firestore();
const chatsRef = db.collection("chats");

export default {
  layout: "chatui",
  data() {
    return {
      // チャット保存用オブジェクト
      chatData: {
        message: "",
        docId: this.$route.params.id,
        uid: "",
        read: false,
      },

      // チャット表示用オブジェクト
      chats: [],
      userProfileImage: "",
      teamImage: "",

      myMessageShape: "myMessageShape",
      othersMessageShape: "othersMessageShape",
      myMessage: "myMessage",
      othersMessage: "othersMessage",
    };
  },
  created: function () {
    this.$store.dispatch("user/userInit");

    //サブコレクションからメッセージを取得する
    chatsRef
      .doc(this.$route.params.id)
      .collection("message")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.chats.push(change.doc.data({ serverTimestamps: "estimate" }));
          }
        });
      });

    //チャットルームを開くと既読フラグ(read)をtrueにする
    chatsRef
      .doc(this.$route.params.id)
      .collection("message")
      .where("read", "==", false)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {

        console.log(doc.id)
            
          // console.log("trueに変更する処理");
          if(doc.data().uid != this.chatData.uid){
            this.$store.dispatch("chat/setReadFlag", {
              docId: this.chatData.docId,
              subDocId: doc.id,
            });
          }
        });
      });



    chatsRef
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.teamImage = doc.data().team_image;
      });

    //メッセージにuidを含める
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.chatData.uid = null;
      } else {
        this.chatData.uid = user.uid;
        this.userProfileImage = `userProfileImages/${user.photoURL}`;

        const storageRef = firebase.storage().ref();
        storageRef
          .child(this.userProfileImage)
          .getDownloadURL()
          .then((url) => {
            this.userProfileImage = url;
          });
      }
    });
  },
  computed: {
    //チャット相手のユーザー情報を表示する
    users() {
      return this.$store.state.user.users.filter(el => el.uid != this.chatData.uid);
    }
  },
  methods: {
    scrollToEnd() {
      this.$nextTick(() => {
        const chatLog = document.getElementById("top");
        if (!chatLog) return;
        chatLog.scrollTop = chatLog.scrollHeight;
      });
    },

    add() {
      this.$store.dispatch("chat/add", this.chatData);
      this.chatData.message = "";
    },
  },
  updated() {
    this.scrollToEnd();
  },
};
</script>

<style lang="postcss" scoped>
/* チャットメッセージの形 */
.myMessageShape {
  @apply flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end;
}

.othersMessageShape {
  @apply flex w-full space-x-3 max-w-xs;
}

/* チャットメッセージの背景色、テキスト色 */
.myMessage {
  @apply bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg;
}
.othersMessage {
  @apply bg-gray-300 p-3 rounded-r-lg rounded-bl-lg;
}
</style>
