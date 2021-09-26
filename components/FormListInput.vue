<template>
  <div>
    <div>
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @input="submit">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <!-- アップロードエリア -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    チームプロフィール画像
                  </label>

                  <!-- アップロード画像ビューエリア -->
                  <div
                    class="mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded-md"
                  >
                  <img :src="teamInfo.showImage" class="h-full w-full" />
                  </div>
                  <!-- アップロードリンク -->
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer my-3 bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
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
                      class="bg-gray-200 mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <span>{{ v.errors[0] }}</span>
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
                      for="last-name"
                      class="block text-sm font-medium text-gray-700"
                      >チームレベル</label
                    >
                    <select
                      v-model="teamInfo.level"
                      name="level"
                      class="bg-gray-200 mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                </div>

                <!-- 主な活動場所 -->
                <div class="col-span-6 sm:col-span-4">
                  <ValidationProvider
                    name="活動場所"
                    rules="required|blank"
                    v-slot="v"
                  >
                    <label
                      for="email-address"
                      class="block text-sm font-medium text-gray-700"
                      >主な活動場所</label
                    >
                    <input
                      type="text"
                      v-model.trim="teamInfo.area"
                      name="area"
                      class="bg-gray-200 mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <span>{{ v.errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <!-- チーム自己紹介 -->
                <!-- <div>
                  <label
                    for="about"
                    class="block text-sm font-medium text-gray-700"
                  >
                    チーム自己紹介
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows="3"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="こんにちは、私たちはチームフットボールです！"
                    ></textarea>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">
                    チームの特徴や試合へのモチベーションを書いて他チームがマッチングしやすいようにしましょう！
                  </p>
                </div> -->
              </div>
            </div>
          </form>
        </div>
      </div>
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
  message: "必須入力項目です"
});

extend("blank", value => {
  if (value.indexOf(" ") === -1 && value.indexOf("　") === -1) {
    return true;
  }
  return "空白は入力できません";
});

export default {
  components: {
    ValidationProvider
  },
  data() {
    return {
      teamInfo: {
        name: "",
        level: "",
        area: "",
        image: "",
        showImage: ""
      }
    };
  },
  methods: {
    submit: function() {
      this.$emit("update", {
        name: this.teamInfo.name,
        level: this.teamInfo.level,
        area: this.teamInfo.area,
        image: this.teamInfo.image,
        userProfileImage: this.teamInfo.userProfileImage,
        showImage: this.teamInfo.showImage
      });
    },
    selectImage(e) {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      this.teamInfo.image = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.teamInfo.showImage = e.target.result;
      };
    }
  }
};
</script>
