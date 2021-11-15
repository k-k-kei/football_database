<template>
  <div>
    <div class="text-gray-800">
      <div
        class="
          relative
          flex flex-col flex-grow
          w-full
          bg-white
          shadow
          overflow-hidden
          overscroll-auto
        "
      >
        <div id="top" class="flex flex-col flex-grow h-60 p-7 overflow-auto">
          <!-- テキスト -->
          <div
            v-for="chat in chats"
            :class="[
              chat.uid === chatData.uid ? myMessageShape : othersMessageShape,
            ]"
            :key="chat.id"
          >
            <div v-if="chat.uid != chatData.uid">
              <nuxt-link :to="'/userPage/' + getUserId(chat.uid)">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="getUserImage(chat.uid)"
                    alt=""
                  />
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
            </div>
          </div>
        </div>
        <!-- テキストここまで -->

        <!-- 送信フォーム -->
        <div class="w-full bg-gray-400 p-4 md:w-2/5 md:mx-auto">
          <div class="flex w-full">
            <input
              type="text"
              class="flex items-center h-10 w-10/12 rounded px-3"
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

// const db = firebase.firestore();
// const chatsRef = db.collection("chats");

export default {
  props: {
    chats: Array,
    ticketId: String,
    collectionName: String,
  },
  //   layout: "chatui",
  data() {
    return {
      // チャット保存用オブジェクト
      chatData: {
        message: "",
        // docId: this.$route.params.id,
        docId: this.ticketId,
        uid: "",
        read: false,
      },

      // チャット表示用オブジェクト
      //   chats: [],
      userProfileImage: "",

      myMessageShape: "myMessageShape",
      othersMessageShape: "othersMessageShape",
      myMessage: "myMessage",
      othersMessage: "othersMessage",
    };
  },
  created: function () {
    this.$store.dispatch("init");
    // this.$store.dispatch("chat/init");
    this.$store.dispatch("user/userInit");

    //メッセージにuidを含める
    auth.onAuthStateChanged((user) => {
      this.chatData.uid = user.uid;
      this.userProfileImage = `userProfileImages/${user.photoURL}`;

      const storageRef = firebase.storage().ref();
      storageRef
        .child(this.userProfileImage)
        .getDownloadURL()
        .then((url) => {
          this.userProfileImage = url;
        });
    });
  },

  computed: {
    //チャット相手のユーザー情報を表示する
    users() {
      const talkUser = this.chats
        .map((el) => (el["uid"] != this.chatData.uid ? el["uid"] : undefined))
        .filter((el) => el != undefined);

      return new Set(talkUser);
    },
  },

  methods: {
    scrollToEnd() {
      this.$nextTick(() => {
        const chatLog = document.getElementById("top");
        if (!chatLog) return;
        chatLog.scrollTop = chatLog.scrollHeight;
      });
    },

    //collectionNameで指定されたコレクションのサブコレクションにチャットを追加
    add() {
      this.$store.dispatch(this.collectionName + "/chatAdd", this.chatData);
      //   this.$store.dispatch("chat/setLatestMessage", {
      //     docId: this.chatData.docId,
      //     latestMessage: this.chatData.message,
      //   });
      this.chatData.message = "";
    },

    getUserImage(uid) {
      return this.$store.state.user.users
        .filter((el) => el.uid === uid)
        .map((el) => el.profileImage);
    },

    getUserId(uid) {
      return this.$store.state.user.users
        .filter((el) => el.uid === uid)
        .map((el) => el.uid);
    },
  },

  updated() {
    this.scrollToEnd();

    // this.chats.forEach((el) => {
    //   if (el.read === false && el.uid === this.chatData.uid) {
    //     this.$store.dispatch("chat/setUnreadFlag", {
    //       docId: this.chatData.docId,
    //       unReadMessage: el.uid,
    //     });
    //     return;
    //   } else {
    //     this.$store.dispatch("chat/setUnreadFlag", {
    //       docId: this.chatData.docId,
    //       unReadMessage: false,
    //     });
    //   }
    // });

    //チャットルームを開くと既読フラグ(read)をtrueにする
    // chatsRef
    //   .doc(this.$route.params.id)
    //   .collection("message")
    //   .where("read", "==", false)
    //   .onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // console.log("trueに変更する処理");
    //       if (doc.data().uid != this.chatData.uid) {
    //         this.$store.dispatch("chat/setReadFlag", {
    //           docId: this.chatData.docId,
    //           subDocId: doc.id,
    //         });
    //       }
    //     });
    //   });
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
