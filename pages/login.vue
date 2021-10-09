<template>
  <div>
    <div
      class="min-h-screen bg-gray-200 py-6 flex flex-col sm:py-12"
    >
      <div class="relative py-3 w-11/12 max-w-xl mx-auto">
        <div class="relative p-8 bg-white shadow-sm rounded-lg">
          <!-- フォーム -->
          <div class="w-full">
            <!-- メールアドレス -->
            <div class="mb-5 relative">
              <input
                type="email"
                id="email"
                class="appearance-none peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                placeholder="name@example.com"
                autocomplete="off"
                v-model="mail"
              />
              <label
                for="email"
                class="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                >Email address</label
              >
            </div>

            <!-- パスワード -->
            <div class="mb-5 relative">
              <input
                type="password"
                id="password"
                class="appearance-none peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                placeholder="password"
                v-model="pass"
              />
              <label
                for="password"
                class="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                >Password</label
              >
            </div>

            <div class="text-red-500">{{ errorMessage }}</div>
            <!-- ボタン -->
            <button
              @click="login"
              class="buttonClickable"
            >
              ログイン
            </button>
          </div>
        </div>
        <div class="text-center p-5">
          <button class="underline hover:text-red-400"><NuxtLink to="/signup">アカウント新規登録</NuxtLink></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

export default {
  data() {
    return {
      mail: "",
      pass: "",

      errorMessage: "",
    };
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.mail, this.pass)
        .then(() => {
          this.$router.push("/myPage");
        })
        .catch(e => this.errorMessage = e.message);
    }
  }
};
</script>

<style lang="postcss" scoped>

.buttonClickable {
  @apply w-full bg-indigo-600 text-white p-3 rounded-md;
}

</style>