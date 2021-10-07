<template>
    <div class="fixed bottom-0 h-14 w-full bg-white rounded-full">
        <div class="m-2">
            <ul class="flex justify-evenly">
                <li>
                    <nuxt-link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <p class="sub-text">ホーム</p>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/search">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p class="sub-text">探す</p>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/chat">
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
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/myPage">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p class="sub-text">マイページ</p>
                    </nuxt-link>
                </li>
            </ul>
        </div>
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