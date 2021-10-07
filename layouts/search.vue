<template>
  <div class="text-gray-700 font-sans text-base md:text-lg">
      <div v-if="isLogin">
        <HeaderWithLogin />
      </div>
      <div v-else>
        <Header />
      </div>
      <SideBar />
      <Nuxt />
      <Footer />
    </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

export default {
  data() {
    return {
      isLogin: "",
    };
  },
  created: function () {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.isLogin = null;
      } else {
        this.isLogin = user.uid;
      }
    });
  },
};
</script>