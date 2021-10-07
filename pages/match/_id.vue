<template>
  <!-- スケジュール調整中の予定表示 -->
  <div class="md:w-2/3">
    <h1 class="text-xl text-white bg-black my-2 px-3 py-4">
      調整中スケジュール詳細
    </h1>
    <div v-for="match in matches" :key="match.id">
      <div class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg">
        <h1 class="text-base font-bold text-gray-800 p-2">
          vs {{ getTeamName(match.teamId) }}
        </h1>
        <div class="flex">
          <div class="w-1/2 px-4 md:p-4">
            <div class="my-4">
              <!-- チーム画像 -->
              <div class="flex-shrink-0 h-28 w-28">
                <img
                  class="h-28 w-28 rounded-full"
                  :src="getTeamImage(match.teamId)"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="w-1/2 px-4 md:p-4">
            <div class="my-4">
              <div class="font-bold">タイトル</div>
              <p class="text-xs">{{ match.title }}</p>
              <div class="font-bold">場所</div>
              <p class="text-xs">{{ match.place }}</p>
            </div>
          </div>
        </div>

        <!-- コメント表示エリア -->
        <div class="font-bold">コメント</div>
        <p class="text-xs">{{ match.comment }}</p>
        <!-- コメント表示エリア -->

        <!-- 候補日表示エリア -->
        <div>
          <table>
            <tr>
              <td></td>
              <td v-for="datetime in match.datetime" :key="datetime.id">
                <div>{{ getDate(datetime) }}</div>
                <div>{{ getTime(datetime) }}</div>
              </td>
            </tr>
            <tr v-for="teamId in match.teamId" :key="teamId.id" class="text-xs">
              <td>{{ getName(teamId) }}</td>
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
        <div
          v-for="(datetime, index) in match.datetime"
          :key="datetime.id"
          class="flex text-xs"
        >
          <div>{{ datetime }}</div>
          <div>
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
        
        <button
          @click="save(team)"
          class="w-11/12 bg-blue-400 text-white m-3 p-3 rounded-md"
        >
          入力完了
        </button>
        <button
          @click="cancel()"
          class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
        >
          キャンセル
        </button>
      </div>
      <!-- 編集画面 -->

      <!-- 初期表示-->
      <div v-else>
        <button
          @click="edit"
          class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
        >
          編集
        </button>
      </div>
      <!-- 初期表示-->
    </div>
    <!-- 日程調整編集エリア -->

    <!-- 日程確定入力エリア -->
    <!-- 日程確定フォーム -->
    <div v-if="showConfirmationForm">
        <h1>確定した日程を入力しよう</h1>
      <!-- バリデーションの監視 -->
      <ValidationObserver v-slot="{ invalid }">
        <!-- チェックボックス検索エリア-->
        <div class="flex mt-5">
          <div class="w-11/12 mx-auto">
            <!-- チーム名 -->
            <div>確定日</div>
            <ValidationProvider name="候補日時" rules="required" v-slot="v">
              <div>
                  <select v-for="match in matches" v-model="confirmationInfo.datetime" :key="match.id" name="datetime">
                    <option v-for="datetime in match.datetime" :key="datetime.id" :value="datetime">{{ getDate(datetime) + getTime(datetime) }}</option>
                  </select>
                <input
                v-model="confirmationInfo.datetime"
                type="datetime-local" />
              </div>
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>

            <div>タイトル</div>
            <ValidationProvider name="タイトル" rules="required" v-slot="v">
              <input
                type="text"
                v-model="confirmationInfo.title"
                placeholder="練習試合...etc"
                class="w-full bg-gray-200 mt-3 p-2 rounded-lg"
              />
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>

            <div>場所</div>
            <ValidationProvider name="場所" rules="required" v-slot="v">
              <input
                type="text"
                v-model="confirmationInfo.place"
                placeholder="かもめコート...etc"
                class="w-full bg-gray-200 mt-3 p-2 rounded-lg"
              />
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>

            <div>コメント</div>
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
    {{ confirmationInfo }}
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
      }
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

    confirm(){
      this.$store.dispatch("match/matchConfirm", {
        docId: this.$route.params.id,
        confirmationInfo: this.confirmationInfo,
      });
      //フォームを閉じる
      this.closeConfirmationForm();
    }
  },
};
</script>
