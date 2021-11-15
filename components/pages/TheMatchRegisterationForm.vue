<template>
  <div class="content" @click="stopEvent">
    <div class="bg-white">
      <div
        class="text-center align-middle flex justify-between mx-5 md:mx-8 py-2"
      >
        <!-- 検索ヘッダー -->
        <div class="w-full">
          <h1 class="text-center p-1">試合募集チケット作成</h1>
        </div>
        <!-- クローズボタン -->
        <div>
            <form @input="closeModalArea">
                <button>
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
            </form>
        </div>
      </div>

      <!-- バリデーションの監視 -->
      <ValidationObserver v-slot="{ invalid }">
        <!-- チェックボックス検索エリア-->
        <div class="flex mt-5 py-5">
          <div class="w-11/12 mx-auto">
            <!-- チーム名 -->
            <div>募集日</div>
            <ValidationProvider name="募集日" rules="required" v-slot="v">
              <div>
                <BaseInputDatetime
                  @inputValue="inputDatetime"
                  class="my-2 p-1 rounded-lg"
                />
              </div>
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>

            <div class="mb-3">
              <ValidationProvider name="タイトル" rules="required" v-slot="v">
                <BaseInputForm
                  :name="'title'"
                  :value="matchmake.title"
                  :label="'タイトル'"
                  :required="false"
                  :placeholder="'練習試合...etc'"
                  @inputValue="inputMatchTitle"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider name="募集レベル" rules="required" v-slot="v">
                <BaseInputForm
                  :name="'level'"
                  :value="matchmake.level"
                  :label="'募集レベル'"
                  :required="false"
                  :placeholder="'競技志向のチームのみ...etc'"
                  @inputValue="inputMatchLevel"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider name="時間" rules="required" v-slot="v">
                <BaseInputForm
                  :name="'time'"
                  :value="matchmake.time"
                  :label="'時間'"
                  :required="false"
                  :placeholder="'2時間...etc'"
                  @inputValue="inputMatchTime"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider name="場所" rules="required" v-slot="v">
                <BaseInputForm
                  :name="'place'"
                  :value="matchmake.place"
                  :label="'場所'"
                  :required="false"
                  :placeholder="'かもめコート...etc'"
                  @inputValue="inputMatchPlace"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div class="sm:text-sm">コメント</div>
            <div class="mb-3">
              <textarea
                id="about"
                v-model="matchmake.comment"
                name="selfIntroduction"
                rows="10"
                class="
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  p-2
                  block
                  w-full
                  sm:text-sm
                  bg-gray-200
                  border border-gray-300
                  rounded-lg
                "
                placeholder="費用感や必要なもの、試合相手に求める要素を記載しましょう！"
              ></textarea>
            </div>

            <!-- matchesコレクションへデータを送信 -->
            <button
              @click="addMatches"
              :disabled="invalid"
              class="buttonClickable"
            >
              作成
            </button>
          </div>
        </div>
      </ValidationObserver>
      <!-- チェックボックス検索エリアここまで -->
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

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
      matchmake: {
        uid: "",
        datetime: "",
        title: "",
        time: "",
        level: "",
        place: "",
        comment: "",
      },
    };
  },

  created() {
    //メッセージにuidを含める
    auth.onAuthStateChanged((user) => this.matchmake.uid = user.uid);
  },

  methods: {
    //エリアモーダルを閉じる
    //現状親コンポーネントにfalseを渡せているわけではなく、
    //ただリロードさせているだけになっている。
    closeModalArea() {
      this.$emit("closeModal", { modal: false });
    },

    //モーダル上のコンテンツをクリックしても、
    //closeModalが発火しないようにしている。
    stopEvent() {
      event.stopPropagation();
    },

    addMatches() {
      this.$store.dispatch("ticket/add", this.matchmake);
      this.closeModalArea();

      this.$toast.success("募集を作成しました！", {
        position: "top-center",
        timeout: 2000,
      });
    },


    inputDatetime(value) {
      this.matchmake.datetime = value;
    },

    inputMatchTitle(value) {
      this.matchmake.title = value;
    },

    inputMatchTime(value) {
      this.matchmake.time = value;
    },

    inputMatchLevel(value) {
      this.matchmake.level = value;
    },

    inputMatchPlace(value) {
      this.matchmake.place = value;
    },
  }
};
</script>

<style lang="postcss" scoped>
/* 作成ボタンのバリデーション結果で出し分ける */
.buttonClickable {
  @apply w-full bg-indigo-600 text-white p-3 rounded-md;
}

:disabled {
  @apply w-full bg-gray-200 text-white p-3 rounded-md;
}

/* モーダル */
.content {
  background-color: white;
  width: 100%;
  height: 100%;
}
</style>
