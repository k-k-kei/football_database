<template>
  <div>
    <div class="bg-white">
      <nav class="flex m-1">
        <button
          class="menuLayout"
          @click="showPublishingTickets"
        >
          公開中
          </button>
          <button
          class="menuLayout"
          @click="showAdjustingTickets"
        >
          調整中
          </button>
          <button
          class="menuLayout"
          @click="showFinishedTickets"
        >
          完了済
        </button>
      </nav>
    </div>

    <div>
      <!-- 
        
      マッチングしていないチケットであるかどうか判定（初期値：unmatch === true）
      
      -->
      <template v-if="unmatch">
        <!-- 条件に当てはまるチケットが無い場合メッセージを表示 -->
        <template v-if="tickets == false">
        <div class="text-center p-5">
            <p>該当するチケットがありません！</p>
        </div>
        </template>
        <!-- 一つでもあればチケットを表示 -->
        <TicketShowCard :tickets="tickets" :link="'/ticket/'" />
      </template>

      <!-- 
        
      マッチング済みの場合はapprvalsコレクションから情報を取得
        
       -->
      <template v-else>
        <!-- 条件に当てはまるチケットが無い場合メッセージを表示 -->
        <template v-if="approvals == false">
        <div class="text-center p-5">
            <p>該当するチケットがありません！</p>
        </div>
        </template>
        <!-- 一つでもあればチケットを表示 -->
        <TicketShowCard :tickets="approvals" :link="'/approval/'" />
      </template>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

import TicketShowCard from "~/components/pages/TicketShowCard";

export default {
  components: {
    TicketShowCard
  },

  data(){
    return {
      userInfo: {
        user_id: ""
      },

      //computed内のtickets関数で取得するリストのflagの初期値を指定
      flag: 0,

      //作成したチケットがマッチング済みかどうか判定するための指標
      unmatch: true
    }
  },

  created() {
    this.$store.dispatch("ticket/init");
    this.$store.dispatch("approval/init");

    auth.onAuthStateChanged((user) => (this.userInfo.user_id = user.uid));
  },

  computed: {
    //自分が作成したかつflagが指定値と同じチケットのリストを取得する
    tickets(){
      return this.$store.state.ticket.tickets
      .filter(el => el.flag === 0 && el.uid === this.userInfo.user_id);
    },

    //自分が作成したかつflagが指定値と同じマッチング済みチケットリストを取得する
    approvals(){
      return this.$store.state.approval.approvals
      .filter(el => el.flag === this.flag && el.participant === this.userInfo.user_id);
    }
  },

  methods: {
    //ステータス：公開済み・マッチング未
    showPublishingTickets(){
      this.unmatch = true;
      this.flag = 0;
    },

    //ステータス：マッチング済・未完了
    showAdjustingTickets(){
      this.unmatch = false;
      this.flag = 1;
    },

    //ステータス：マッチング済・完了
    showFinishedTickets(){
      this.unmatch = false;
      this.flag = 2;
    },
  }
}
</script>

<style lang="postcss" scoped>
.menuLayout {
  @apply text-gray-600 w-1/3 p-4 block hover:text-blue-500 focus:outline-none border-b-2 hover:border-blue-500;
}

</style>
