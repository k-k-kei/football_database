<template>
  <div>
    <div
      v-for="teamInfo in teamDetailed"
      :key="teamInfo.id"
      class="
        h-screen
        max-w-sm
        mx-auto
        overflow-hidden
        bg-white
        rounded-lg
        shadow-lg
        dark:bg-gray-800
        mt-3
      "
    >
      <!-- チームプロフィール画像 -->
      <img
        class="object-cover object-center w-full h-56"
        :src="teamInfo.image"
        alt="avatar"
      />

      <div class="px-6 py-4">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
          {{ teamInfo.name }}
        </h1>

        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
          </svg>
          <h1 class="px-2 text-sm">{{ teamInfo.level }}</h1>
        </div>

        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <svg
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
            />
          </svg>

          <h1 class="px-2 text-sm">{{ teamInfo.area }}</h1>
        </div>

        <!-- チーム自己紹介 -->
        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <p class="px-2 text-sm">{{ teamInfo.selfIntroduction }}</p>
        </div>
        <!-- チーム自己紹介ここまで -->

        <!-- 登録したユーザー情報 -->
        <div v-for="user in users" :key="user.id">
          <nuxt-link
            :to="'/userPage/' + user.uid"
            class="flex items-center mt-4 text-gray-700 dark:text-gray-200"
          >
            <div class="flex-shrink-0 h-10 w-10">
              <img
                class="h-10 w-10 rounded-full"
                :src="user.profileImage"
                :alt="user.name"
              />
            </div>
            <h1 class="px-2 text-sm">{{ user.displayName }}</h1>
          </nuxt-link>
        </div>
      </div>
      <!-- 登録したユーザー情報 -->

      <!-- チャット申請するチームを選ぶ -->
      <h1 class="text-xl text-white bg-black my-2 px-3 py-4">
        チームを選択してチャット申請
      </h1>
      <div v-if="uid === null">
        <h1>チャット申請を送るにはログインが必要です。</h1>
      </div>
      <div class="w-full text-center">
        <select
          v-model="selectedTeamId"
          id="select"
          name="teams"
          class="bg-gray-200 w-11/12 p-2 rounded-lg"
        >
          <option disabled value="">チームを選択してください</option>
          <option v-for="team in teams" :value="team.id" :key="team.id">
            <div>{{ team.name }}</div>
          </option>
        </select>
        <!-- チャット申請するチームを選ぶ -->
      </div>
      <div v-if="selectedTeamId != ''">
        <div v-if="chatLog(selectedTeamId)">
          <button class="w-11/12 bg-gray-400 text-white m-3 p-3 rounded-lg">
            チャット申請済み
          </button>
        </div>
        <div v-else>
          <button
            @click="add(teamInfo.user_id, teamInfo.id)"
            class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-lg"
          >
            チャット申請
          </button>
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
      teamId: this.$route.params.id,
      makeUserId: "",
      selectedTeamId: "",
    };
  },
  created: function() {
    this.$store.dispatch("init");
    this.$store.dispatch("user/userInit");
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
    // チャット申請する自チームを選択
    teams() {
      return this.$store.state.teams.filter((el) => el.user_id === this.uid);
    },
    // 条件を元に表示するチームを決定
    teamDetailed() {
      const teams = this.$store.state.teams.filter((el) => {
        return el.id === this.$route.params.id;
      });
      teams.forEach((el) => (this.makeUserId = el.user_id));
      return teams;
    },

    users() {
      return this.$store.state.user.users.filter(
        (el) => this.makeUserId === el.uid
      );
    },
  },
  methods: {
    //チャットルームを作成する
    add(other_id, team_id) {
      if (this.uid === null) {
        this.$router.push("/login");
      } else {
        this.$store.dispatch("chat/makeChatRoom", {
          uid: this.uid,
          other_id: other_id,
          team_id: [team_id, this.selectedTeamId],
        });
      }
    },

    //以前チャットしたことがあるかを判定
    chatLog(teamId) {
        return this.$store.state.chat.chats
          .filter((el) => el.uid === this.uid || el.other_id === this.uid)
          .filter((data) => data.team_id.some((id) => id === teamId))
          .filter((team) => team.team_id.some((id) => id === this.$route.params.id))
          .length != 0;
    },
  },
};
</script>
