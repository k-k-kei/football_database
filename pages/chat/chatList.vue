<template>
  <div>
    <!-- チーム一覧 -->
    <h1 class="text-xl text-white bg-black my-2 px-3 py-4">
      チーム一覧
    </h1>
    <div class="bg-white divide-y divide-gray-200">
      <div class="flex flex-wrap px-6 py-4 whitespace-nowrap">
        <div v-for="team in teams" :key="team.id" class="w-1/5 m-2 items-center">
          <NuxtLink :to="'/chat/' + team.id">
            <div class="flex-shrink-0 h-16 w-16 mx-auto">
              <img class="h-16 w-16 rounded-lg" :src="team.image" alt="" />
            </div>
            <!-- ユーザー名 -->
            <div class="text-sm font-medium text-gray-900 overflow-hidden">
              {{ team.name }}
            </div>
          </NuxtLink>
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
      uid: "",
    };
  },
  created: function() {
    this.$store.dispatch("init");

    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.uid = null;
      } else {
        this.uid = user.uid;
      }
    });
  },
  computed: {
    teams() {
      return this.$store.state.teams.filter((el) => el.user_id === this.uid);
    },
  },
};
</script>
