<template>
  <!-- スケジュール調整中の予定表示 -->
  <div class="md:w-2/5 md:mx-auto">
    <BaseTitleHeader :title="'調整中スケジュール詳細'" />
    <div v-for="match in matches" :key="match.id">
      <div class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg">
        <div class="flex p-2">
          <div class="flex items-center">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 class="text-base font-bold text-gray-800 p-2">
            {{ match.title }}
          </h1>
          <p class="text-base font-bold text-gray-800 p-2">
            vs {{ getTeamName(match.teamId) }}
          </p>
          <div class="flex-shrink-0 h-10 w-10 mx-2">
            <img
              class="h-10 w-10 rounded-full"
              :src="getTeamImage(match.teamId)"
              alt=""
            />
          </div>
        </div>

        <!-- コメント表示エリア -->
        <div class="p-2">
        <div class="text-sm font-bold">【コメント】</div>
        <p class="text-xs">{{ match.comment }}</p>
        </div>
        <!-- コメント表示エリア -->

        <!-- 候補日表示エリア -->
        <div class="my-8 p-2">
        <div class="text-sm font-bold">【候補日時】</div>
          <table>
            <tr class="border-b border-gray-500">
              <td></td>
              <td v-for="datetime in match.datetime" :key="datetime.id" class="text-sm p-1">
                <div>{{ getDate(datetime) }}</div>
                <div>{{ getTime(datetime) }}</div>
              </td>
            </tr>
            <tr v-for="teamId in match.teamId" :key="teamId.id">
              <td class="text-sm p-1">{{ getName(teamId) }}</td>
              <td
                v-for="answer in getAnswer(teamId)"
                :key="answer.id"
                class="text-center"
              >
                {{ makeMark(answer) }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 候補日表示エリア -->

      <!-- 日程調整編集エリア -->
      <!-- 編集画面 -->
      <div v-if="showDatetimeInputForm">
    <div class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg">
      <div class="p-2">
        <div class="text-sm font-bold">【出欠登録】</div>
        <div
          v-for="(datetime, index) in match.datetime"
          :key="datetime.id"
          class="flex mx-auto text-lg px-2 py-1"
        >
        <div>
          <ul>
            <li>{{ getDate(datetime) }} {{ getTime(datetime) }}</li>
          </ul>
        </div>
          <div class="px-2">
            <input
              type="radio"
              v-model="picked[index]"
              id="one"
              :name="index"
              value="0"
            />
            <label for="one">◎</label>
            <input
              type="radio"
              v-model="picked[index]"
              id="two"
              :name="index"
              value="1"
            />
            <label for="two">△</label>
            <input
              type="radio"
              v-model="picked[index]"
              id="three"
              :name="index"
              value="2"
            />
            <label for="three">×</label>
          </div>
        </div>

      <div class="flex mt-5">
        <button
          @click="save(team)"
          class="w-1/2 bg-blue-400 text-white m-2 p-3 rounded-md"
        >
          入力完了
        </button>
        <button
          @click="cancel()"
          class="w-1/2 bg-gray-400 text-white m-2 p-3 rounded-md"
        >
          キャンセル
        </button>
      </div>
      </div>
      </div>
      </div>
      <!-- 編集画面 -->

      <!-- 初期表示-->
      <div v-else>
        <button
          @click="edit"
          class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
        >
          出欠を入力する
        </button>
      </div>
      <!-- 初期表示-->
    </div>
    <!-- 日程調整編集エリア -->

    <!-- 日程確定入力エリア -->
    <!-- 日程確定フォーム -->
    <div v-if="showConfirmationForm">
      <BaseTitleHeader :title="'確定した日程を入力する'" />
      <!-- バリデーションの監視 -->
      <ValidationObserver v-slot="{ invalid }">
        <!-- チェックボックス検索エリア-->
        <div class="flex mt-5 py-5">
          <div class="w-11/12 mx-auto">
            
            <div>確定日</div>
            <ValidationProvider name="候補日時" rules="required" v-slot="v">
              <div class="mb-3">
                <select
                  v-for="match in matches"
                  v-model="confirmationInfo.datetime"
                  :key="match.id"
                  name="datetime"
                  class="w-full bg-gray-200 p-2 rounded-lg"
                >
                  <option
                    v-for="datetime in match.datetime"
                    :key="datetime.id"
                    :value="datetime"
                    >{{ getDate(datetime) + getTime(datetime) }}</option
                  >
                </select>
              </div>
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>

            <div>タイトル</div>
            <ValidationProvider name="タイトル" rules="required" v-slot="v">
              <div class="mb-3">
              <input
                type="text"
                v-model="confirmationInfo.title"
                placeholder="練習試合...etc"
                class="w-full bg-gray-200 p-2 rounded-lg"
              />
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
              </div>
            </ValidationProvider>

            <div>場所</div>
            <ValidationProvider name="場所" rules="required" v-slot="v">
              <div class="mb-3">
              <input
                type="text"
                v-model="confirmationInfo.place"
                placeholder="かもめコート...etc"
                class="w-full bg-gray-200 p-2 rounded-lg"
              />
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
              </div>
            </ValidationProvider>

            <div>コメント</div>
            <div class="mb-3">
            <div class="mt-1">
              <textarea
                id="about"
                name="selfIntroduction"
                v-model="confirmationInfo.comment"
                rows="10"
                class="
                          shadow-sm
                          focus:ring-indigo-500
                          focus:border-indigo-500
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
              :disabled="invalid"
              @click="confirm"
              class="w-full bg-red-400 text-white mt-5 p-3 rounded-md"
            >
              確定する
            </button>
            <button
              @click="closeConfirmationForm"
              class="w-full bg-gray-400 text-white mt-5 p-3 rounded-md"
            >
              閉じる
            </button>
          </div>
        </div>
      </ValidationObserver>
      <!-- チェックボックス検索エリアここまで -->
    </div>

    <!-- 日程ボタン -->
    <div v-else>
      <button
        @click="openConfirmationForm"
        class="w-11/12 bg-red-400 text-white m-3 p-3 rounded-md"
      >
        確定した日程を入力
      </button>
    </div>
  </div>
  <!-- スケジュール調整中の予定表示 -->
</template>

<script>
import { auth } from "~/plugins/firebase";
import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const matchesRef = db.collection("matches");

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
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      uid: "",

      showDatetimeInputForm: false,
      showConfirmationForm: false,

      picked: [],
      answers: [],

      isTeamId: "",

      confirmationInfo: {
        datetime: "",
        title: "",
        place: "",
        comment: "",
      },
    };
  },
  created() {
    this.$store.dispatch("init");
    this.$store.dispatch("match/init");

    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.uid = null;
      } else {
        this.uid = user.uid;
      }
    });

    //サブコレクションからメッセージを取得する
    matchesRef
      .doc(this.$route.params.id)
      .collection("answers")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.answers.push(change.doc);
          }
        });
      });
  },
  computed: {
    // 現在ログイン中のユーザーのチームIDを取得
    team() {
      return this.$store.state.teams
        .filter((el) => el.user_id === this.uid)
        .filter((data) => this.isTeamId.some((id) => id === data.id))
        .map((team) => team.id)[0];
    },

    // 現在表示中のmatchデータを取得
    // また、表示中のmatchデータから登録されたチームのIDをdataの変数に代入。
    // teamメソッドでチーム識別に使うため
    matches() {
      const match = this.$store.state.match.matches.filter(
        (el) => el.id === this.$route.params.id
      );

      match.forEach((el) => (this.isTeamId = el.teamId));
      return match;
    },
  },

  methods: {
    getTeamName(array) {
      return this.$store.state.teams
        .filter((el) => array.some((data) => data === el.id))
        .filter((teams) => teams.user_id != this.uid)
        .map((team) => team.name)[0];
    },

    getTeamImage(array) {
      return this.$store.state.teams
        .filter((el) => array.some((data) => data === el.id))
        .filter((teams) => teams.user_id != this.uid)
        .map((team) => team.image)[0];
    },

    getName(id) {
      return this.$store.state.teams
        .filter((el) => el.id === id)
        .map((team) => team.name)[0];
    },

    edit() {
      this.showDatetimeInputForm = true;
    },

    cancel() {
      this.showDatetimeInputForm = false;
    },

    save(teamId) {
      this.$store.dispatch("match/addAnswer", {
        docId: this.$route.params.id,
        teamId: teamId,
        answers: this.picked,
      });

      this.$toast.success("登録完了！", {
        position: "top-center",
        timeout: 2000,
      });
    },

    getAnswer(id) {
      const answers = this.answers
        .flatMap((el) => {
          if (el.id === id) return el.data().answer;
        })
        .filter((el) => el != null);
      return answers;
    },

    makeMark(answer) {
      if (answer === "0") return "◎";
      if (answer === "1") return "△";
      if (answer === "2") return "×";
    },

    getDate(datetime) {
      return datetime
        .replace("-", "/")
        .replace("-", "/")
        .slice(0, -6);
    },

    getTime(datetime) {
      return datetime.slice(-5);
    },

    openConfirmationForm() {
      this.showConfirmationForm = true;
    },

    closeConfirmationForm() {
      this.showConfirmationForm = false;
    },

    confirm() {
      this.$store.dispatch("match/matchConfirm", {
        docId: this.$route.params.id,
        confirmationInfo: this.confirmationInfo,
      });

      this.$toast.success("確定しました", {
        position: "top-center",
        timeout: 2000,
      });

      this.$router.go(-1);
    },
  },
};
</script>
