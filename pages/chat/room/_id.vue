<template>
  <div>
    <div
      class="
        flex
        min-h-screen
        text-gray-800
      "
    >
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
        <!-- チャットで使う便利ツール -->
        <div class="flex">
          <button
            @click="openModalArea"
            class="bg-gray-100 rounded w-1/2 m-2 p-2 text-center"
          >
            <p>日程調整</p>
          </button>
          <button class="bg-gray-100 rounded w-1/2 m-2 p-2 text-center">
            <p>マッチレポート</p>
          </button>
        </div>
        <!-- チャットで使う便利ツール -->

        <div
          id="top"
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

              <!-- 送信時間表示 -->
              <!-- チャット入力と同時に表示されるため、toDateの中身がnullになってエラーとなってしまう。 -->
              <!-- チャット入力後、timestampの値を受け取って時刻表示形式に直せばエラーは収まるはず。 -->
              <span class="text-xs text-gray-500 leading-none">{{
                Number(
                  chat.timestamp
                    .toDate()
                    .getMonth()
                    .toString()
                    .padStart(2, "0")
                ) +
                  1 +
                  "/" +
                  chat.timestamp
                    .toDate()
                    .getDate()
                    .toString()
                    .padStart(2, "0") +
                  " " +
                  chat.timestamp
                    .toDate()
                    .getHours()
                    .toString()
                    .padStart(2, "0") +
                  ":" +
                  chat.timestamp
                    .toDate()
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")
              }}</span>
            </div>
          </div>
        </div>
        <!-- テキストここまで -->

        <!-- 送信フォーム -->
        <div class="fixed w-full bottom-0 bg-gray-400 p-4 md:w-2/5 md:mx-auto">
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

    <!-- モーダルウィンドウ -->
    <div>
      <div class="overlay overflow-scroll md:w-3/4 md:mx-auto" v-show="showContentArea">
        <div class="content" @click="stopEvent">
          <div class="bg-white">
            <div
              class="
                text-center
                align-middle
                flex
                justify-between
                mx-5
                md:mx-8
                py-2
              "
            >
              <!-- 検索ヘッダー -->
              <div class="w-full">
                <h1 class="text-center p-1">日程調整作成フォーム</h1>
              </div>
              <!-- クローズボタン -->
              <div>
                <button @click="closeModalArea">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- バリデーションの監視 -->
            <ValidationObserver v-slot="{ invalid }">
              <!-- チェックボックス検索エリア-->
              <div class="flex mt-5">
                <div class="w-11/12 mx-auto">
                  <!-- チーム名 -->
                  <div>候補日</div>
                  <ValidationProvider
                    name="候補日時"
                    rules="required"
                    v-slot="v"
                  >
                    <div>
                      <input
                        type="datetime-local"
                        v-model="matchmake.datetime[0]"
                      />
                    </div>
                    <div class="bg-yellow-500 text-white text-center">
                      {{ v.errors[0] }}
                    </div>
                  </ValidationProvider>
                  <div>
                    <input
                      type="datetime-local"
                      v-model="matchmake.datetime[1]"
                    />
                  </div>
                  <div>
                    <input
                      type="datetime-local"
                      v-model="matchmake.datetime[2]"
                    />
                  </div>
                  <div>{{ matchmake.datetime }}</div>

                  <div>タイトル</div>
                  <div>
                    <ValidationProvider
                      name="タイトル"
                      rules="required"
                      v-slot="v"
                    >
                      <input
                        type="text"
                        v-model="matchmake.title"
                        placeholder="練習試合...etc"
                        class="w-full bg-gray-200 mt-3 p-2 rounded-lg"
                      />
                      <div class="bg-yellow-500 text-white text-center">
                        {{ v.errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div>場所</div>
                  <div>
                    <ValidationProvider name="場所" rules="required" v-slot="v">
                      <input
                        type="text"
                        v-model="matchmake.place"
                        placeholder="かもめコート...etc"
                        class="w-full bg-gray-200 mt-3 p-2 rounded-lg"
                      />
                      <div class="bg-yellow-500 text-white text-center">
                        {{ v.errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div>コメント</div>
                  <div>
                    <div class="mt-1">
                      <textarea
                        id="about"
                        v-model="matchmake.comment"
                        name="selfIntroduction"
                        rows="10"
                        class="
                          shadow-sm
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          mt-2
                          p-2
                          block
                          w-full
                          sm:text-sm
                          bg-gray-200
                          border border-gray-300
                          rounded-lg
                        "
                        placeholder="こんにちは、よろしくお願いします！"
                      ></textarea>
                    </div>
                  </div>

                  <!-- matchesコレクションへデータを送信 -->
                  <button
                    @click="addMatches"
                    :disabled="invalid"
                    class="w-full bg-gray-400 text-white mt-5 p-3 rounded-md"
                  >
                    作成する
                  </button>
                </div>
              </div>
            </ValidationObserver>
            <!-- チェックボックス検索エリアここまで -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { auth } from "~/plugins/firebase";

const db = firebase.firestore();
const chatsRef = db.collection("chats");

import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate";

//バリデーションルールをここで定義
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "必須入力項目です",
});

export default {
  layout: "chatui",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
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

      myMessageShape: "myMessageShape",
      othersMessageShape: "othersMessageShape",
      myMessage: "myMessage",
      othersMessage: "othersMessage",

      showContentArea: false,

      inputCount: 0,

      matchmake: {
        teamId: [],
        datetime: [],
        title: "",
        place: "",
        comment: "",
      },
    };
  },
  created: function() {
    this.$store.dispatch("init");
    this.$store.dispatch("chat/init");
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
      const talkUser = this.chats
        .map((el) => (el["uid"] != this.chatData.uid ? el["uid"] : undefined))
        .filter((el) => el != undefined);

      return new Set(talkUser);
    },
  },
  methods: {
        // モーダルのチーム一覧を表示するためのidを呼び出す
    getTeamId() {
      const ids = this.$store.state.chat.chats
        .filter((el) => el.id === this.$route.params.id)
        .map((data) => data.team_id)
        .flat();

      this.matchmake.teamId = ids;
    },
    scrollToEnd() {
      this.$nextTick(() => {
        const chatLog = document.getElementById("top");
        if (!chatLog) return;
        chatLog.scrollTop = chatLog.scrollHeight;
      });
    },

    add() {
      this.$store.dispatch("chat/add", this.chatData);
      this.$store.dispatch("chat/setLatestMessage", {
        docId: this.chatData.docId,
        latestMessage: this.chatData.message,
      });
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

    //エリアモーダルを開く
    openModalArea() {
      this.getTeamId()
      this.showContentArea = true;
    },

    //エリアモーダルを閉じる
    closeModalArea() {
      this.showContentArea = false;
    },

    //モーダル上のコンテンツをクリックしても、
    //closeModalが発火しないようにしている。
    stopEvent() {
      event.stopPropagation();
    },

    // 日程調整モーダルでチーム一覧を表示する
    getTeamName(id) {
      return this.$store.state.teams
        .filter((el) => el.id === id)
        .map((data) => data.name)[0];
    },

    countPlus() {
      this.inputCount++;
    },

    countMinus() {
      this.inputCount--;
    },

    addMatches() {
      this.$store.dispatch("match/add", this.matchmake);
      this.closeModalArea();
    },
  },

  updated() {
    this.scrollToEnd();

    this.chats.forEach((el) => {
      if (el.read === false && el.uid === this.chatData.uid) {
        this.$store.dispatch("chat/setUnreadFlag", {
          docId: this.chatData.docId,
          unReadMessage: el.uid,
        });
        return;
      } else {
        this.$store.dispatch("chat/setUnreadFlag", {
          docId: this.chatData.docId,
          unReadMessage: false,
        });
      }
    });

    //チャットルームを開くと既読フラグ(read)をtrueにする
    chatsRef
      .doc(this.$route.params.id)
      .collection("message")
      .where("read", "==", false)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log("trueに変更する処理");
          if (doc.data().uid != this.chatData.uid) {
            this.$store.dispatch("chat/setReadFlag", {
              docId: this.chatData.docId,
              subDocId: doc.id,
            });
          }
        });
      });
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

/* モーダル */
.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
}
.content {
  background-color: white;
  width: 100%;
  height: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
