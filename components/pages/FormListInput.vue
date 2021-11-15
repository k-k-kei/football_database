<template>
  <div>
    <div>
      <form @input="submit">
        <div class="sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6 md:mt-5">
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
                      class="appearance-none sr-only"
                    />
                  </form>
                </label>
              </div>
            </div>

            <!-- チーム名入力 -->
            <div class="col-span-6 sm:col-span-3">
              <ValidationProvider name="チーム名" rules="required" v-slot="v">
                <BaseInputForm
                  :name="'teamName'"
                  :value="teamInfo.name"
                  :label="'チーム名'"
                  :required="true"
                  :placeholder="'チーム名'"
                  @inputValue="inputTeamName"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- 競技種目 -->
            <div class="col-span-6 sm:col-span-4">
              <ValidationProvider
                name="競技種目"
                rules="required|blank"
                v-slot="v"
              >
                <!-- 競技種目を選ぶセレクトボックス -->
                <BaseSelectBox
                  :options="category"
                  :name="'category'"
                  :label="'競技種目'"
                  :required="true"
                  :value="'競技種目を入力'"
                  @selected="selectedCategory"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- チームレベル -->
            <div class="col-span-6 sm:col-span-3">
              <ValidationProvider name="競技レベル" rules="required" v-slot="v">
                <!-- 競技レベルを選ぶセレクトボックス -->
                <BaseSelectBox
                  :options="level"
                  :name="'level'"
                  :label="'競技レベル'"
                  :required="true"
                  :value="'競技レベルを入力'"
                  @selected="selectedLevel"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- 試合へのモチベーション -->
            <div class="col-span-6 sm:col-span-4">
              <ValidationProvider
                name="試合へのモチベーション"
                rules="required|blank"
                v-slot="v"
              >
                <!-- 試合へのモチベーションを選ぶセレクトボックス -->
                <BaseSelectBox
                  :options="motibation"
                  :name="'motibation'"
                  :label="'試合へのモチベーション'"
                  :required="true"
                  :value="'試合へのモチベーションを入力'"
                  @selected="selectedMotibation"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- 活動している都道府県 -->
            <div class="col-span-6 sm:col-span-4">
              <ValidationProvider
                name="活動場所"
                rules="required|blank"
                v-slot="v"
              >
                <!-- 試合へのモチベーションを選ぶセレクトボックス -->
                <BaseSelectBox
                  :options="prefectures"
                  :name="'area1'"
                  :label="'都道府県'"
                  :required="true"
                  :value="'都道府県'"
                  @selected="selectedArea1"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- 活動している市町村区① -->
            <div class="col-span-6 sm:col-span-3">
              <ValidationProvider name="チーム名" rules="required" v-slot="v">
                <BaseInputForm
                  :name="'area2'"
                  :value="teamInfo.area2"
                  :label="'よく活動する市町村区①'"
                  :required="true"
                  :placeholder="'（例）枚方市'"
                  @inputValue="inputArea2"
                />

                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- 活動している市町村区② -->
            <div class="col-span-6 sm:col-span-3">
              <BaseInputForm
                :name="'area3'"
                :value="teamInfo.area3"
                :label="'よく活動する市町村区②'"
                :required="false"
                :placeholder="'（例）横浜市'"
                @inputValue="inputArea3"
              />
            </div>

            <!-- チーム自己紹介 -->
            <div class="col-span-6 sm:col-span-3">
              <ValidationProvider
                name="チーム自己紹介"
                rules="required"
                v-slot="v"
              >
                <div>
                  <label
                    for="selfIntroduction"
                    class="block text-sm font-medium text-gray-700"
                  >
                    チーム自己紹介 <span class="text-red-400">※必須</span>
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="selfIntroduction"
                      name="selfIntroduction"
                      v-model.trim="teamInfo.selfIntroduction"
                      rows="10"
                      class="
                         appearance-none
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
                <div class="bg-yellow-500 text-white text-center">
                  {{ v.errors[0] }}
                </div>
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

//必須入力設定
extend("required", {
  ...required,
  message: "必須入力項目です",
});

//空白不可設定
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
      maxWidth: 300,

      teamInfo: {
        name: "",
        category: "",
        level: "",
        motibation: "",
        area1: "",
        area2: "",
        area3: "",
        // image: "",
        image: [],
        showImage: "",
        selfIntroduction: "",
      },

      category: ["サッカー", "フットサル"],

      level: [
        "競技志向（ハイレベル）",
        "競技志向（シリアス）",
        "競技志向（ジェネラル）",
        "エンジョイ（シリアス）",
        "エンジョイ（ジェネラル）",
        "エンジョイ（ファン）",
      ],

      motibation: [
        "勝ち負けにこだわりたい",
        "勝ち負けにこだわりすぎないが真剣にハードに",
        "ハードすぎずしっかりめにやりたい",
        "お互い楽しくエンジョイ志向でやりたい",
      ],

      prefectures: [
        "東京都",
        "神奈川",
        "埼玉",
        "千葉",
        " 群馬",
        " 栃木",
        " 茨城",
        " 山梨",
        "愛知県",
        "岐阜県",
        "三重県",
        "静岡県",
        "大阪府",
        "京都府",
        "兵庫県",
        "奈良県",
        " 滋賀県",
        " 和歌山県",
      ],
    };
  },
  methods: {
    submit: function() {
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

    //保存するチームプロフィール画像を選択
    selectImage(e) {
      // inputからfileデータを取得
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => {

        // 取得したイメージのサイズを判定する。
        // 指定した最大サイズ以上であればサイズを比率を保ったまま縮小。
        let img = new Image();

        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > this.maxWidth) {
            height = Math.round((height * this.maxWidth) / width);
            width = this.maxWidth;
          }

          // canvasを作成して指定したサイズでアップロード画像を当てはめる
          let canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // canvasの画像をfileに変換、保存先に送付するために変数に格納する
          ctx.canvas.toBlob((blob) => {
            console.log(blob)
              const imageFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                this.teamInfo.image = imageFile;
                console.log(this.teamInfo.image)
            }, file.type, 1);

        };

        // アップロードした画像をプレビューで表示するために変数に格納する
        img.src = e.target.result;
        this.teamInfo.showImage = img.src;
      };
    },

    inputTeamName(value) {
      this.teamInfo.name = value;
    },

    selectedCategory(value) {
      this.teamInfo.category = value;
    },

    selectedLevel(value) {
      this.teamInfo.level = value;
    },

    selectedMotibation(value) {
      this.teamInfo.motibation = value;
    },

    selectedArea1(value) {
      this.teamInfo.area1 = value;
    },

    inputArea2(value) {
      this.teamInfo.area2 = value;
    },

    inputArea3(value) {
      this.teamInfo.area3 = value;
    },
  },
};
</script>
