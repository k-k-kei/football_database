<template>
  <div>
    <LayoutTitleHeader :title="'チーム詳細'" />
    <!-- チーム詳細情報 -->
    <TeamDetailCard :teamDetailed="teamDetailed" />

    <!-- 登録したユーザー情報 -->
    <TeamDetailOwner :users="users" />

    <!-- チャット申請するチームを選ぶ -->
    <div class="h-screen/3">
      <LayoutTitleHeader :title="'チームを選択してチャット申請'" />

      <!-- ログインしていない場合の表示 -->
      <div v-if="uid === null">
        <h1 class="text-center p-5">チャット申請を送るにはログインが必要です。</h1>
        <Nuxt-link to="/login">
        <button class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md">
          ログイン
        </button>
        </Nuxt-link>
      </div>

      <!-- ログインした場合の表示 -->
      <div v-else>
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
      return (
        this.$store.state.chat.chats
          .filter((el) => el.uid === this.uid || el.other_id === this.uid)
          .filter((data) => data.team_id.some((id) => id === teamId))
          .filter((team) =>
            team.team_id.some((id) => id === this.$route.params.id)
          ).length != 0
      );
    },
  },
};
</script>
