<template>
  <div>
    <div>
          <form @input="submit">
            <div class="sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <!-- アップロードエリア -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    チームプロフィール画像
                  </label>

                  <!-- アップロード画像ビューエリア -->
                  <div
                    class="
                      mt-1
                      flex
                      justify-center
                      border-2 border-gray-300 border-dashed
                      rounded-md
                    "
                  >
                    <img :src="teamInfo.showImage" class="h-full w-full" />
                  </div>
                  <!-- アップロードリンク -->
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="
                        relative
                        cursor-pointer
                        my-3
                        bg-white
                        rounded-md
                        font-medium
                        text-indigo-600
                        hover:text-indigo-500
                        focus-within:outline-none
                        focus-within:ring-2
                        focus-within:ring-offset-2
                        focus-within:ring-indigo-500
                      "
                    >
                      <span>画像をアップロードする</span>
                      <form @input="submit">
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          @change="selectImage"
                          class="sr-only"
                        />
                      </form>
                    </label>
                  </div>
                </div>

                <!-- チーム名入力 -->
                <div class="col-span-6 sm:col-span-3">
                  <ValidationProvider
                    name="チーム名"
                    rules="required"
                    v-slot="v"
                  >
                    <label
                      for="first-name"
                      class="block text-sm font-medium text-gray-700"
                      >チーム名</label
                    >
                    <input
                      type="text"
                      v-model.trim="teamInfo.name"
                      name="name"
                      id="name"
                      class="
                        bg-gray-200
                        mt-1
                        p-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                    <div class="bg-yellow-500 text-white text-center">{{ v.errors[0] }}</div>
                  </ValidationProvider>
                </div>

                <!-- 競技種目 -->
                <div class="col-span-6 sm:col-span-4">
                  <ValidationProvider
                    name="競技種目"
                    rules="required|blank"
                    v-slot="v"
                  >
                    <label
                      for="category"
                      class="block text-sm font-medium text-gray-700"
                      >競技種目</label
                    >
                    <select
                      v-model="teamInfo.category"
                      name="category"
                      class="
                        bg-gray-200
                        mt-1
                        p-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    >
                      <option disabled>競技種目を入力</option>
                      <option>サッカー</option>
                      <option>フットサル</option>
                    </select>
                    <div class="bg-yellow-500 text-white text-center">{{ v.errors[0] }}</div>
                  </ValidationProvider>
                </div>

                <!-- チームレベル -->
                <div class="col-span-6 sm:col-span-3">
                  <ValidationProvider
                    name="競技レベル"
                    rules="required"
                    v-slot="v"
                  >
                    <label
                      for="level"
                      class="block text-sm font-medium text-gray-700"
                      >競技レベル</label
                    >
                    <select
                      v-model="teamInfo.level"
                      name="level"
                      class="
                        bg-gray-200
                        mt-1
                        p-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    >
                      <option disabled>競技レベルを選択</option>
                      <option>競技志向（ハイレベル）</option>
                      <option>競技志向（シリアス）</option>
                      <option>競技志向（ジェネラル）</option>
                      <option>エンジョイ（シリアス）</option>
                      <option>エンジョイ（ジェネラル）</option>
                      <option>エンジョイ（ファン）</option>
                    </select>
                    <div class="bg-yellow-500 text-white text-center">{{ v.errors[0] }}</div>
                  </ValidationProvider>
                </div>

                <!-- 試合へのモチベーション -->
                <div class="col-span-6 sm:col-span-4">
                  <ValidationProvider
                    name="試合へのモチベーション"
                    rules="required|blank"
                    v-slot="v"
                  >
                    <label
                      for="motibation"
                      class="block text-sm font-medium text-gray-700"
                      >試合へのモチベーション</label
                    >
                    <select
                      v-model="teamInfo.motibation"
                      name="motibation"
                      class="
                        bg-gray-200
                        mt-1
                        p-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    >
                      <option disabled>試合へのモチベーション</option>
                      <option>勝ち負けにこだわりたい</option>
                      <option>勝ち負けにこだわりすぎないが真剣にハードに</option>
                      <option>エンジョイでは物足りない。ハードすぎずしっかりめにやりたい</option>
                      <option>お互い楽しくエンジョイ志向でやりたい</option>
                    </select>
                    <div class="bg-yellow-500 text-white text-center">{{ v.errors[0] }}</div>
                  </ValidationProvider>
                </div>

                <!-- 活動している都道府県 -->
                <div class="col-span-6 sm:col-span-4">
                  <ValidationProvider
                    name="活動場所"
                    rules="required|blank"
                    v-slot="v"
                  >
                    <label
                      for="area1"
                      class="block text-sm font-medium text-gray-700"
                      >都道府県</label
                    >
                    <select
                      v-model="teamInfo.area1"
                      name="area1"
                      class="
                        bg-gray-200
                        mt-1
                        p-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    >
                      <option disabled>活動している都道府県を入力</option>
                      <option v-for="prefecture in prefectures" :key="prefecture.id">{{ prefecture }}</option>
                    </select>
                    <div class="bg-yellow-500 text-white text-center">{{ v.errors[0] }}</div>
                  </ValidationProvider>
                </div>

                <!-- 活動している市町村区① -->
                <div class="col-span-6 sm:col-span-3">
                  <ValidationProvider
                    name="チーム名"
                    rules="required"
                    v-slot="v"
                  >
                    <label
                      for="area2"
                      class="block text-sm font-medium text-gray-700"
                      >よく活動する市町村区①</label
                    >
                    <input
                      type="text"
                      v-model.trim="teamInfo.area2"
                      name="area2"
                      id="area2"
                      class="
                        bg-gray-200
                        mt-1
                        p-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                    <div class="bg-yellow-500 text-white text-center">{{ v.errors[0] }}</div>
                  </ValidationProvider>
                </div>

                <!-- 活動している市町村区② -->
                <div class="col-span-6 sm:col-span-3">
                    <label
                      for="area3"
                      class="block text-sm font-medium text-gray-700"
                      >よく活動する市町村区②</label
                    >
                    <input
                      type="text"
                      v-model.trim="teamInfo.area3"
                      name="area3"
                      id="area3"
                      class="
                        bg-gray-200
                        mt-1
                        p-2
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                </div>

                <!-- チーム自己紹介 -->
              <div class="col-span-6 sm:col-span-3">
                <ValidationProvider name="チーム自己紹介" rules="required" v-slot="v">
                  <div>
                    <label
                      for="selfIntroduction"
                      class="block text-sm font-medium text-gray-700"
                    >
                      チーム自己紹介
                    </label>
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
                          mt-1
                          block
                          w-full
                          sm:text-sm
                          border border-gray-300
                          rounded-md
                        "
                        placeholder="こんにちは、私たちはチームフットボールです！"
                      ></textarea>
                    </div>
                    <p class="mt-2 text-xs text-gray-500">
                      チームの特徴や試合へのモチベーションを書いて他チームがマッチングしやすいようにしましょう！
                    </p>
                  </div>
                  <div class="bg-yellow-500 text-white text-center">{{ v.errors[0] }}</div>
                </ValidationProvider>
              </div>
              </div>
            </div>
          </form>
    </div>

    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200"></div>
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

extend("blank", (value) => {
  if (value.indexOf(" ") === -1 && value.indexOf("　") === -1) {
    return true;
  }
  return "空白は入力できません";
});

export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      teamInfo: {
        name: "",
        category: "",
        level: "",
        motibation: "",
        area1: "",
        area2: "",
        area3: "",
        image: "",
        showImage: "",
        selfIntroduction: "",
      },

      prefectures: [
        "東京都", "神奈川", "埼玉", "千葉", " 群馬", " 栃木", " 茨城", " 山梨",
        "愛知県", "岐阜県", "三重県", "静岡県",
        "大阪府", "京都府", "兵庫県", "奈良県", " 滋賀県", " 和歌山県",
      ]
    };
  },
  methods: {
    submit: function () {
      this.$emit("update", {
        name: this.teamInfo.name,
        category: this.teamInfo.category,
        level: this.teamInfo.level,
        motibation: this.teamInfo.motibation,
        area1: this.teamInfo.area1,
        area2: this.teamInfo.area2,
        area3: this.teamInfo.area3,
        image: this.teamInfo.image,
        userProfileImage: this.teamInfo.userProfileImage,
        showImage: this.teamInfo.showImage,
        selfIntroduction: this.teamInfo.selfIntroduction,
      });
    },
    selectImage(e) {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      this.teamInfo.image = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.teamInfo.showImage = e.target.result;
      };
    },
  },
};
</script>
