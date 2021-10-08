<template>
  <div>
    <div
      class="
          max-w-sm
          my-5
          mx-auto
          overflow-hidden
          bg-white
          rounded-lg
          shadow-lg
          dark:bg-gray-800
        "
    >

        <!-- チーム名 -->
        <div class="px-6 py-4">
          <ValidationProvider
            name="チーム名"
            rules="required"
            v-slot="{ errors }"
          >
            <div>
              <input
                type="text"
                v-model="teamInfo.name"
                class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
              />
            </div>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

        <!-- 競技カテゴリー -->
        <ValidationProvider name="競技カテゴリー" rules="required" v-slot="v">
            <select
              v-model="teamInfo.category"
              name="競技カテゴリー"
              class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
            >
              <option disabled>競技カテゴリーを選択</option>
              <option>サッカー</option>
              <option>フットサル</option>
            </select>
            <span>{{ v.errors[0] }}</span>
          </ValidationProvider>

          <!-- 競技レベル -->
          <ValidationProvider name="競技レベル" rules="required" v-slot="v">
            <select
              v-model="teamInfo.level"
              name="競技レベル"
              class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
            >
              <option disabled>競技レベルを選択</option>
              <option>競技志向（ハイレベル）</option>
              <option>競技志向（シリアス）</option>
              <option>競技志向（ジェネラル）</option>
              <option>エンジョイ（シリアス）</option>
              <option>エンジョイ（ジェネラル）</option>
              <option>エンジョイ（ファン）</option>
            </select>
            <span>{{ v.errors[0] }}</span>
          </ValidationProvider>

        <!-- モチベーション -->
        <ValidationProvider name="モチベーション" rules="required" v-slot="v">
            <select
              v-model="teamInfo.motibation"
              name="モチベーション"
              class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
            >
                      <option disabled>試合へのモチベーション</option>
                      <option>勝ち負けにこだわりたい</option>
                      <option>勝ち負けにこだわりすぎないが真剣にハードに</option>
                      <option>エンジョイでは物足りない。ハードすぎずしっかりめにやりたい</option>
                      <option>お互い楽しくエンジョイ志向でやりたい</option>
            </select>
            <span>{{ v.errors[0] }}</span>
          </ValidationProvider>

          <!-- 都道府県 -->
          <ValidationProvider
            name="都道府県"
            rules="required"
            v-slot="{ errors }"
          >
            <div>
              <input
                type="text"
                v-model="teamInfo.area1"
                class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
              />
            </div>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- 市町村区① -->
          <ValidationProvider
            name="市区町村①"
            rules="required"
            v-slot="{ errors }"
          >
            <div>
              <input
                type="text"
                v-model="teamInfo.area2"
                class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
              />
            </div>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- 市町村区② -->
            <div>
              <input
                type="text"
                v-model="teamInfo.area3"
                class="bg-gray-200 w-full mt-2 p-2 rounded-lg"
              />
            </div>

          <!-- チーム自己紹介 -->
          <ValidationProvider name="自己紹介" rules="required" v-slot="v">
            <div>
              <div class="mt-1">
                <textarea
                  id="selfIntroduction"
                  name="selfIntroduction"
                  v-model.trim="teamInfo.selfIntroduction"
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
                  placeholder="こんにちは、私たちはチームフットボールです！"
                ></textarea>
              </div>
            </div>
            <span>{{ v.errors[0] }}</span>
          </ValidationProvider>
        </div>
    </div>
  </div>
</template>

<script>
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
    ValidationProvider,
  },
  props: {
    teamInfo: Object,
    profileImage: String,
    showImage: String,
  },
  data() {
    return {
      teamInfo: {
        name: "",
        category: "",
        level: "",
        motibation: "",
        area: "",
        area1: "",
        area2: "",
        area3: "",
        image: "",
        showImage: "",
        selfIntroduction: "",
      },

      selectImage: "",
      updatedFile: "",
      profileImage: "",
    };
  },
  methods: {
    submit: function () {
      this.$emit("update", {
        name: this.teamInfo.name,
        category: this.teamInfo.category,
        level: this.teamInfo.level,
        motibation: this.teamInfo.motibation,
        area: this.teamInfo.area,
        area1: this.teamInfo.area1,
        area2: this.teamInfo.area2,
        area3: this.teamInfo.area3,
        image: this.teamInfo.image,
        // userProfileImage: this.teamInfo.userProfileImage,
        showImage: this.teamInfo.showImage,
        selfIntroduction: this.teamInfo.selfIntroduction,
      });
    },
  }
};
</script>