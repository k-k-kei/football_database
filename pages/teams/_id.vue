<template>
  <div class="md:w-3/4 md:mx-auto">
    <div class="md:flex">
      <div class="md:w-1/2 md:mx-5">
        <BaseTitleHeader :title="'チーム詳細'" />
        <!-- チーム詳細情報 -->
        <TeamDetailCard :teamDetailed="teamDetailed" />
      </div>

      <div class="md:w-1/2">
        <!-- 登録したユーザー情報 -->
        <BaseTitleHeader :title="'チームオーナー'" />
        <TeamDetailOwner :users="users" />

        <!-- チャット申請するチームを選ぶ -->
        <div class="h-screen/2">
          <BaseTitleHeader :title="'チャット申請'" />

          <!-- ログインしていない場合の表示 -->
          <div v-if="uid === null">
            <h1 class="text-center p-5">
              チャット申請を送るにはログインが必要です。
            </h1>
            <Nuxt-link to="/login">
              <button
                class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-md"
              >
                ログイン
              </button>
            </Nuxt-link>
          </div>

          <!-- ログインした場合の表示 -->
          <div v-else>
            <div class="w-full text-center">
              <h1 class="text-center p-5">
                チャットを送るマイチームを選択しましょう！
              </h1>

              <!-- チャット申請を送るチームセレクトボックス -->
              <BaseSelectBox
                :options="teams" 
                :value="'チームを選択してください'" 
                @selected="selected" 
              />
            </div>

            <!-- チームセレクトするまで申請ボタンは隠しておく -->
            <div v-if="selectedTeamId != ''">

              <!-- 選択されたチームIDを引数で取得、
              過去にチャット履歴があれば「申請済み」のボタンを表示。 -->
              <div v-if="chatLog(selectedTeamId)">
                <button
                  @click="alreadyMadedMessage()"
                  class="w-11/12 bg-gray-400 text-white m-3 p-3 rounded-lg"
                >
                  チャット申請済み
                </button>
              </div>

              <!-- 過去にチャット申請していなければ
              「チャット申請」ボタンを表示する。 -->
              <div v-else>
                <button
                  @click="add(makeUserId, teamId)"
                  class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-lg"
                >
                  チャット申請
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

import TeamDetailCard from "~/components/pages/TeamDetailCard"
import TeamDetailOwner from "~/components/pages/TeamDetailOwner"

export default {
  components: {
    TeamDetailCard,
    TeamDetailOwner
  },

  data() {
    return {
      uid: "",

      //表示するチームを指定するチーム個別のID
      teamId: this.$route.params.id,

      //chatルーム作成時、参加ユーザーを識別するのに必要
      //addでstoreに送られてfirestoreに格納される
      //---------------------------------------------------
          //詳細表示されているチームを作成したユーザーIDを格納
          makeUserId: "",
          //チャット申請時に選択した自チームのIDを格納
          selectedTeamId: "",
      //---------------------------------------------------
    };
  },

  created: function() {
    this.$store.dispatch("init");
    this.$store.dispatch("user/userInit");
    this.$store.dispatch("chat/init");

    auth.onAuthStateChanged((user) => this.uid = user.uid);
  },

  computed: {

    // チャット申請する自チームを選択
    teams() {
      return this.$store.state.teams
      .filter((el) => el.user_id === this.uid)
      .map(team => team.name);
    },

    // 条件を元に表示するチームを決定
    teamDetailed() {
      const teams = this.$store.state.teams
      .filter((el) => el.id === this.$route.params.id);

      teams.forEach((el) => (this.makeUserId = el.user_id));
      
      return teams;
    },

    //チームを管理しているユーザー情報を取得
    users() {
      return this.$store.state.user.users
      .filter((el) => this.makeUserId === el.uid);
    },
  },

  methods: {

    //セレクトボックスで選択した値を取得
    selected(value){
      this.selectedTeamId = this.getTeamId(value);
      console.log(this.selectedTeamId)
    },

    // セレクトボックスで選択されたチーム名をチームIDに変換するため関数
    getTeamId(name) {
      return this.$store.state.teams
      .filter((el) => el.user_id === this.uid && el.name === name)
      .map(team => team.id)[0];
    },

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

      //トースト表示
      this.$toast.success("チャット申請完了！", {
        position: "top-center",
        timeout: 2000,
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

    //チャット済みの場合のフィードバック
    alreadyMadedMessage(){
      this.$toast("チャット申請済みです", {
        position: "top-center",
        timeout: 2000,
          });
    }
  },
};
</script>
