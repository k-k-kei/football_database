<template>
  <div class="md:w-1/2 md:mx-auto">
    <!-- チーム一覧 -->
    <LayoutTitleHeader :title="'チャット一覧'" />
    <div class="bg-white divide-y divide-gray-200">

      <!-- チャットの有無で表示を切り替え -->
      <div v-if="checkContents()">

      <div class="flex flex-wrap px-6 py-4 whitespace-nowrap">

        <div v-for="team in teams" :key="team.id" class="relative w-1/5 m-2 items-center">
          <NuxtLink :to="'/chat/' + team.id">
            
            <!-- 未読数表示 -->
            <div
              v-if="getUnreadMessage(team.id) != 0"
              class="absolute -top-2 -right-2 bg-red-500 rounded-full h-7 w-7 text-center">
                <span class="text-white align-middle">{{getUnreadMessage(team.id)}}</span>
            </div>
            <!-- 未読数表示 -->
            
            <div class="flex-shrink-0 h-16 w-16 mx-auto md:h-full md:w-full">
              <img class="h-full w-full rounded-lg" :src="team.image" alt="" />
            </div>
            <!-- ユーザー名 -->
            <div class="text-sm font-medium text-center text-gray-900 p-1 overflow-hidden">
              {{ team.name }}
            </div>
          </NuxtLink>
        </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center p-5">
          <div>現在作成されたチャットはありません</div>
          <div>チームを登録してチャットをはじめましょう！</div>
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
    teams() {
      return this.$store.state.teams.filter((el) => el.user_id === this.uid);
    },
  },
  methods: {
      getUnreadMessage(status){
        return this.$store.state.chat.chats
        .filter(el => el.team_id.some(data => data === status))
        .filter(team => team.unReadMessage != false && team.unReadMessage != this.uid).length;
      },

      checkContents(){
        return this.teams.length != 0 ? true : false;
      }
  },
};
</script>
