<template>
  <div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg px-3"
          >
            <!-- テーブル全体 -->
            <table class="min-w-full divide-y divide-gray-200">
              <!-- テーブルカード -->
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="chat in chats"
                  :key="chat.id"
                  class="px-6 py-4"
                >

                  <!-- 左から1番目の要素 -->
                  <td>
                    <nuxt-link :to="'/chat/' + chat.id">
                      <div
                        v-for="user in users"
                        :key="user.id"
                        class="flex items-center mx-4 my-2"
                      >
                        <!-- ユーザー画像 -->
                        <div class=" flex-shrink-0 h-10 w-10">
                          <img
                            class="h-10 w-10 rounded-full"
                            :src="user.profileImage"
                            alt=""
                          />
                        </div>

                        <!-- ユーザー名 -->
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ user.displayName }}
                          </div>
                        </div>
                      </div>
                    </nuxt-link>
                  </td>

                  <!-- 左から2番目の要素 -->
                  <td class="px-6 py-4">
                      <div class="text-xs text-gray-500 text-right leading-none">{{
                        (Number(chat.timestamp.toDate().getMonth().toString().padStart(2, "0")) + 1) + "/" +
                        chat.timestamp.toDate().getDate().toString().padStart(2, "0") + " " +
                        chat.timestamp.toDate().getHours().toString().padStart(2, "0") + ":" +
                        chat.timestamp.toDate().getMinutes().toString().padStart(2, "0")
                      }}</div>
                    <div
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                    >
                      <button @click="remove(chat.id)">delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
      loginUserId: "",

      chatInfo: {
        uid: ""
      },
    };
  },
  created: function() {
    this.$store.dispatch("chat/init");
    this.$store.dispatch("user/userInit");

    //ログイン中のユーザーuidをdataに保存
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.loginUserId = null;
      } else {
        this.loginUserId = user.uid;
      }
    });
  },
  methods: {
    remove(id) {
      this.$store.dispatch("chat/remove", id);
    },
  },
  computed: {
    //chatsデータの中で自分のuidが含まれるルームだけ表示する
    chats() {
      const chats = this.$store.state.chat.chats
      .filter(el => el.uid === this.loginUserId || el.other_id === this.loginUserId)
      .sort((a, b) => b - a);

      chats.forEach(el => {
        if(el.uid === this.loginUserId){
          this.chatInfo.uid = el.other_id;
        }else{
          this.chatInfo.uid = el.uid;
        }
      });
      return chats;
    },

    //チャット相手のユーザー情報を表示する
    users() {
      return this.$store.state.user.users.filter(el => el.uid === this.chatInfo.uid);
    }
  }
};
</script>

<style scoped>
li > span > span.done {
  text-decoration: line-through;
}
</style>
