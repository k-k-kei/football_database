<template>
  <div class="text-gray-700 font-sans text-base md:text-lg">
      <div v-if="isLogin">
        <BaseHeaderLogin />
      </div>
      <div v-else>
        <BaseHeader />
      </div>
      <div class="md:w-3/4 mx-auto">
      <SideBar />
      <Nuxt />
      <BaseFooter />
      <div class="md:hidden">
      <AppBarMobile />
      </div>
      </div>
    </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

import BaseHeader from "~/components/layouts/BaseHeader"
import BaseHeaderLogin from "~/components/layouts/BaseHeaderLogin"
import SideBar from "~/components/pages/SideBar"
import BaseFooter from "~/components/layouts/BaseFooter"
import AppBarMobile from "~/components/layouts/AppBarMobile"

export default {
  components: {
    BaseHeader,
    BaseHeaderLogin,
    SideBar,
    BaseFooter,
    AppBarMobile
  },
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