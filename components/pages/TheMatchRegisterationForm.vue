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
            <div>募集日 <span class="text-sm text-red-400">※必須</span></div>
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
                  :required="true"
                  :placeholder="'練習試合...etc'"
                  @inputValue="inputMatchTitle"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider name="競技種目" rules="required" v-slot="v">
                <BaseSelectBox
                  :name="'category'"
                  :label="'競技種目'"
                  :required="true"
                  :options="category"
                  @selected="inputMatchCategory"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider name="募集レベル" rules="required" v-slot="v">
                <BaseSelectBox
                  :name="'level'"
                  :label="'募集レベル'"
                  :required="true"
                  :options="level"
                  @selected="inputMatchLevel"
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
                  :required="true"
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
                <BaseSelectBox
                  :name="'area'"
                  :label="'希望地域'"
                  :required="true"
                  :options="area"
                  @selected="inputMatchArea"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div class="mb-3">
                <BaseInputForm
                  :name="'place'"
                  :value="matchmake.place"
                  :label="'使用予定コート'"
                  :required="false"
                  :placeholder="'かもめコート...etc'"
                  @inputValue="inputMatchPlace"
                />
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
      area: ["渋谷区", "新宿区"],
      category: ["サッカー", "フットサル"],
      level: [
        "競技志向（ハイレベル）",
        "競技志向（シリアス）",
        "競技志向（ジェネラル）",
        "エンジョイ（シリアス）",
        "エンジョイ（ジェネラル）",
        "エンジョイ（ファン）",
      ],

      matchmake: {
        uid: "",
        datetime: "",
        title: "",
        category: "",
        time: "",
        level: "",
        area: "",
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

    inputMatchCategory(value) {
      this.matchmake.category = value;
    },

    inputMatchTime(value) {
      this.matchmake.time = value;
    },

    inputMatchLevel(value) {
      this.matchmake.level = value;
    },

    inputMatchArea(value) {
      this.matchmake.area = value;
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
