<template>
    <!-- 
      
      iphoneX以降のフルスクリーンに対応できていないため要調整。
      
     -->
    <div class="fixed bottom-0 h-14 w-full bg-white">
        <div class="pt-2">
            <ul class="flex justify-evenly pb-2">
                <li>
                    <nuxt-link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <p class="sub-text">ホーム</p>
                    </nuxt-link>
                </li>
                <li>
                    <a href="/search">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p class="sub-text">探す</p>
                    </a>
                </li>
                <li>
                    <button @click="addValidation(uid)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <p class="sub-text">追加</p>
                    </button>
                </li>
                <li>
                    <button @click="mepageValidation(uid)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p class="sub-text">マイページ</p>
                    </button>
                </li>
            </ul>
        </div>

    <transition>
        <div
          class="overlay overflow-scroll md:w-1/2 md:mx-auto"
          v-show="modal"
        >
        <!-- チケット作成フォームコンポーネント -->
        <TheMatchRegisterationForm />
        </div>
    </transition>
    </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

import TheMatchRegisterationForm from "~/components/pages/TheMatchRegisterationForm";

export default {
  components: {
    TheMatchRegisterationForm
  },
  data() {
    return {
      uid: "",

      modal: false
    };
  },
  created() {
    this.$store.dispatch("chat/init");

    auth.onAuthStateChanged((user) => this.uid = user.uid);
  },
  computed: {
    chats() {
      return this.$store.state.chat.chats.filter(
        (el) => el.uid === this.uid || el.other_id === this.uid
      );
    },
  },
  methods: {
    //ログインしていない場合、チャットではなくログインページを表示する
    addValidation(uid){
        if(uid === null){
          this.$toast("ログインが必要です", {
            position: "top-center",
            timeout: 2000,
          });
          this.$router.push("/auth/login");
        }else{
          this.showModal()
        }
    },

    //ログインしていない場合、マイページではなくログインページを表示する
    mepageValidation(uid){
        if(uid === null){
          this.$toast("ログインが必要です", {
            position: "top-center",
            timeout: 2000,
          });
          this.$router.push("/auth/login");
        }else{
          this.$router.push("/myPage");
        }
    },

    showModal(){
      this.modal  = true;
    },

    getUnreadMessage(obj) {
      return obj.some(
        (el) => el.unReadMessage != false && el.unReadMessage != this.uid
      );
    },

  },
};
</script>


<style lang="postcss" scoped>
.icon-size{
    @apply h-4 w-4 mx-auto;
}

.sub-text{
    @apply text-xs text-center;
}

/* モーダル */
.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
}
</style>