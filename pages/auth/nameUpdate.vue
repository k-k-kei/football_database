<template>
  <div>
    <div class="min-h-screen bg-gray-200 py-6 flex flex-col sm:py-12">
      <div class="relative py-3 w-11/12 max-w-xl mx-auto">
        <div class="relative p-8 bg-white shadow-sm rounded-lg">
          <!-- フォーム -->
          <div
            v-for="user in users"
            :key="user.id"
            class="w-full">
            <!-- バリデーションの監視 -->
            <ValidationObserver v-slot="{ invalid }">
              <!-- メールアドレス入力フォーム -->
              <div class="mb-5 relative">
                <ValidationProvider name="名前" rules="required" v-slot="v">
                  <input
                    type="text"
                    id="name"
                    class="appearance-none peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                    placeholder="フットボール太郎"
                    autocomplete="off"
                    v-model.trim="name"
                  />
                  <label
                    for="name"
                    class="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                    >Name</label
                  >
                  <div class="bg-yellow-500 text-white text-center">{{ v.errors[0] }}</div>
                </ValidationProvider>
              </div>

              <!-- 新規登録ボタン -->
              <button
                @click="update(user.id)"
                :disabled="invalid"
                class="buttonClickable"
              >
                登録
              </button>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
const user = auth.currentUser;

import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate";

//バリデーションルールをここで定義
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "必須入力項目です"
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      uid: "",
      name: "",
      docId: "",
    };
  },
  created(){
    this.$store.dispatch("user/userInit");

    auth.onAuthStateChanged(user => {
      this.uid = user.uid;
    });
  },
  computed: {
    users() {
      return this.$store.state.user.users.filter(el => el.uid === this.uid);
    }
  },
  methods: {
    update(id) {
      user
        .updateProfile({
          displayName: this.name
        })
        .then(() => {
          auth.onAuthStateChanged(user => {
            this.$store.dispatch("user/updateUserInfo", {
              docId: id,
              displayName: user.displayName
            });
          });
          this.$router.push("/auth/nameUpdateComplate");
        })
        .catch(error => {
          console.log(error);
        });

        this.$toast.success("登録完了！", {
            position: "top-center",
            timeout: 2000,
          });

      this.$router.push("/");
    }
  }
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