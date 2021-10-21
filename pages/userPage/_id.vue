<template>
  <div class="my-2 md:w-3/4 md:mx-auto md:flex">
    <div class="md:w-1/3 md:mx-3">
      <BaseTitleHeader :title="'ユーザー情報'" />
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
      </div>
    </div>

    <!-- 所属チーム一覧 -->
    <div class="md:w-2/3 md:mx-3">
      <BaseTitleHeader :title="'登録チーム一覧'" />
      <TeamShowCard :teams="teams" :userInfo="userInfo" :link="/teams/" />
    </div>
  </div>
</template>

<script>
import TeamShowCard from "~/components/pages/TeamShowCard"

export default {
  components: {
    TeamShowCard
  },
  data() {
    return {
      userId: this.$route.params.id,
      // チーム一覧を表示するコンポーネントのために空のuserInfoを定義
      userInfo: {},
    };
  },
  created: function() {
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
