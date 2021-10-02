<template>
  <div>
    <div class="bg-white divide-y divide-gray-200">
      <div class="px-6 py-4 whitespace-nowrap">
        <div v-for="user in users" :key="user.id" class="flex items-center">
          <!-- ユーザー画像 -->
          <div class="flex-shrink-0 h-10 w-10">
            <img
              class="h-10 w-10 rounded-full"
              :src="user.profileImage"
              :alt="user.displayName"
            />
          </div>
          <!-- ユーザー名 -->
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">
              {{ user.displayName }}
            </div>
          </div>
        </div>
      </div>


      <!-- 所属チーム一覧 -->
      <h1 class="text-xl text-white bg-black my-2 px-3 py-4">
          チーム一覧
      </h1>
      <div
        v-for="team in teams"
        :key="team.id"
        class="
          w-11/12
          m-2
          mx-auto
          overflow-hidden
          bg-white
          rounded-lg
          shadow-lg
        "
      >
        <NuxtLink :to="'/teams/' + team.id">
          <h1 class="text-base font-bold text-gray-800 p-2">
            {{ team.name }}
          </h1>
          <div class="flex">
            <div class="w-1/2">
              <img :src="team.image" :alt="team.image" />
            </div>

            <div class="w-1/2 px-4 md:p-4">
              <div class="mt-2">
                <div class="font-bold">チームレベル</div>
                <p class="text-xs">{{ team.level }}</p>
              </div>
              <div class="my-4">
                <div class="font-bold">エリア</div>
                <p class="text-xs">{{ team.area }}</p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.id,
    };
  },
  created: function () {
    this.$store.dispatch("init");
    this.$store.dispatch("user/userInit");
  },
  computed: {
    teams() {
      return this.$store.state.teams.filter((el) => el.user_id === this.userId);
    },
    users() {
      return this.$store.state.user.users.filter(
        (el) => el.uid === this.userId
      );
    },
  },
};
</script>
