<template>
  <div class="relative py-3 w-11/12 max-w-xl mx-auto">
    <div class="relative p-8 bg-white shadow-sm rounded-lg">
      <!-- 入力画面 -->

      <!-- フォーム -->
      <div class="w-full">
        <div class="text-center underline my-5 md:text-2xl">新規登録</div>

        <!-- バリデーションの監視 -->
        <ValidationObserver v-slot="{ invalid }">
          <!-- メールアドレス入力フォーム -->
          <div class="mb-5 relative">
            <ValidationProvider
              name="メールアドレス"
              rules="required|email"
              v-slot="v"
            >
              <input
                type="email"
                id="email"
                class="appearance-none peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                placeholder="name@example.com"
                autocomplete="off"
                v-model.trim="mail"
              />
              <label
                for="email"
                class="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                >メールアドレス</label
              >
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>
          </div>

          <!-- パスワード入力フォーム -->
          <span>パスワードは8文字以上必須です</span>
          <div class="mb-5 relative">
            <ValidationProvider
              name="パスワード"
              rules="required|alpha_num|min"
              v-slot="v"
            >
              <input
                type="password"
                id="password"
                class="appearance-none peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                placeholder="password"
                v-model.trim="pass"
              />
              <label
                for="password"
                class="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                >パスワード</label
              >
              <div class="bg-yellow-500 text-white text-center">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>
          </div>

          <div class="text-red-500">{{ errorMessage }}</div>
          <!-- 新規登録ボタン -->
          <button @click="signup" :disabled="invalid" class="buttonClickable">
            登録する
          </button>
        </ValidationObserver>
      </div>
    </div>
    <div class="text-center p-5">
      <button class="underline hover:text-red-400">
        <NuxtLink to="/login">すでにアカウントをお持ちの方</NuxtLink>
      </button>
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
import { email } from "vee-validate/dist/rules";
import { alpha_num } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "必須入力項目です",
});

extend("min", (value) => {
  if (value.length >= 8) {
    return true;
  }
  return "8文字以上で設定してください";
});

extend("email", {
  ...email,
  message: "無効なメールアドレスです",
});

extend("alpha_num", {
  ...alpha_num,
  message: "アルファベットと数字のみ使用できます",
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      //   name: "",
      mail: "",
      pass: "",

      errorMessage: "",
    };
  },
  methods: {
    signup() {
      auth
        .createUserWithEmailAndPassword(this.mail, this.pass)
        .then(() => {
          auth.onAuthStateChanged((user) => {
            this.$store.dispatch("user/makeUserInfo", {
              uid: user.uid,
              displayName: "デフォルトネーム",
            });
          });
          this.$toast.success("登録完了！", {
            position: "top-center",
            timeout: 2000,
          });
          this.$router.push("/auth/signUpComplateMessage");
        })
        .catch((e) => (this.errorMessage = e.message));
    },
  },
};
</script>

<style lang="postcss" scoped>
.buttonClickable {
  @apply w-full bg-indigo-600 text-white p-3 rounded-md;
}

:disabled {
  @apply w-full bg-gray-200 text-white p-3 rounded-md;
}
</style>
