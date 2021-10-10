<template>
  <div class="md:w-1/2 md:mx-auto md:m-5 md:border">
  <LayoutTitleHeader :title="'チームチャットリスト'" />
    <div class="flex flex-col w-full">
      <div v-if="checkContents()">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="overflow-hidden border-b border-gray-200 sm:rounded-lg px-3"
          >
            <!-- テーブル全体 -->
            <table class="min-w-full divide-y divide-gray-200">
              <!-- テーブルカード -->
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="chat in chats" :key="chat.id" class="px-6 py-4">
                  <!-- 左から1番目の要素 -->
                  <td>
                    <nuxt-link :to="'/chat/room/' + chat.id">
                      <div class="flex items-center mx-4 my-2">
                        <!-- ユーザー画像 -->
                        <div class=" flex-shrink-0 h-10 w-10">
                          <img
                            class="h-10 w-10 rounded-full"
                            :src="getUserImage(chat.uid, chat.other_id)"
                            alt=""
                          />
                        </div>

                        <!-- ユーザー名 -->
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            <span>{{
                              getUserName(chat.uid, chat.other_id)
                            }}</span>
                            <span>/</span>
                            <span
                              class="text-xs text-gray-600 overflow-hidden"
                              >{{ getTeamName(chat.team_id) }}</span
                            >
                          </div>
                          <div class="text-xs">
                            {{ chat.latestMessage }}
                          </div>
                        </div>
                      </div>
                    </nuxt-link>
                  </td>

                  <!-- 左から2番目の要素 -->
                  <td class="px-6 py-4">
                    <div class="text-xs text-gray-500 text-right leading-none">
                      {{
                        Number(
                          chat.timestamp
                            .toDate()
                            .getMonth()
                            .toString()
                            .padStart(2, "0")
                        ) +
                          1 +
                          "/" +
                          chat.timestamp
                            .toDate()
                            .getDate()
                            .toString()
                            .padStart(2, "0") +
                          " " +
                          chat.timestamp
                            .toDate()
                            .getHours()
                            .toString()
                            .padStart(2, "0") +
                          ":" +
                          chat.timestamp
                            .toDate()
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")
                      }}
                    </div>
                    <div
                      v-if="checkUnReadMessage(chat.unReadMessage)"
                      class="text-right text-red-800 p-1"
                    >
                      未読
                    </div>
                    <!-- <div
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                    >
                      <button @click="remove(chat.id)">delete</button>
                    </div> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      <div v-else>
        <div class="text-center p-5">
          <div>現在進行中のチャットはありません。</div>
          <div>たくさんのチームと交流してここをいっぱいにしましょう！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

export default {
  layout: "default",
  data() {
    return {
      loginUserId: "",

      chatInfo: {
        uid: "",
        other_id: "",
        unReadMessage: false,
      },
    };
  },
  created: function() {
    this.$store.dispatch("init");
    this.$store.dispatch("chat/init");
    this.$store.dispatch("user/userInit");

    //ログイン中のユーザーuidをdataに保存
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.loginUserId = null;
      } else {
        this.loginUserId = user.uid;
      }
    });
  },
  // methods: {
  //   remove(id) {
  //     this.$store.dispatch("chat/remove", id);
  //   },
  // },
  computed: {
    chats() {
      return this.$store.state.chat.chats
        .filter(
          (el) =>
            el.uid === this.loginUserId || el.other_id === this.loginUserId
        )
        .filter(
          (data) =>
            [...data.team_id].some((el) => el === this.$route.params.list) ===
            true
        )
        .sort((a, b) => b.timestamp - a.timestamp);
    },
  },
  methods: {
    getUserImage(uid, other_id) {
      const id = uid === this.loginUserId ? other_id : uid;

      return this.$store.state.user.users
        .filter((el) => el.uid === id)
        .map((el) => el.profileImage);
    },
    getUserName(uid, other_id) {
      const id = uid === this.loginUserId ? other_id : uid;

      return this.$store.state.user.users
        .filter((el) => el.uid === id)
        .map((el) => el.displayName)[0];
    },

    checkUnReadMessage(status) {
      if (status != this.loginUserId && status != false) return true;
      return false;
    },

    getTeamName(array) {
      return this.$store.state.teams
        .filter((el) => array.some((data) => data === el.id))
        .filter((teams) => teams.user_id != this.loginUserId)
        .map((team) => team.name)[0];
    },

    checkContents(){
        return this.chats.length != 0 ? true : false;
    }
  },
};
</script>

<style scoped>
li > span > span.done {
  text-decoration: line-through;
}
</style>
