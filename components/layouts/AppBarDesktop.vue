<template>
        <div>
            <ul class="flex">
                <li class="ml-5">
                    <a href="/search">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p class="sub-text">探す</p>
                    </a>
                </li>
                <li class="ml-8">
                    <button @click="chatValidation(uid)">
                    <div class="relative">
                    <div
                    class="absolute right-2 h-3 w-3 bg-red-500 rounded-full"
                    v-if="getUnreadMessage(chats)"
                    >
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    </div>
                    <p class="sub-text">チャット</p>
                    </button>
                </li>
                <li class="ml-5">
                    <button @click="mepageValidation(uid)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p class="sub-text">マイページ</p>
                    </button>
                </li>
            </ul>
        </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

export default {
  data() {
    return {
      uid: "",
    };
  },
  created() {
    this.$store.dispatch("chat/init");

    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.uid = null;
      } else {
        this.uid = user.uid;
      }
    });
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
    chatValidation(uid){
        if(uid === null){
          this.$toast("ログインが必要です", {
            position: "top-center",
            timeout: 2000,
          });
          this.$router.push("/auth/login");
        }else{
          this.$router.push("/chat");
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
    @apply h-8 w-8 mx-auto;
}

.sub-text{
    @apply text-xs text-center;
}
</style>