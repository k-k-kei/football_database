<template>
  <div class="bg-gray-200 md:w-1/2 md:mx-5">
    <TicketDetailCard :ticketDetail="ticketDetail" />
    <BaseTitleHeader :title="'コメント欄'" />
    <TheChatView :chats="chats" :ticketId="ticketId" :collectionName="'approval'" />
    <div>
      <button
        class="w-11/12 bg-red-400 text-white m-3 p-3 rounded-lg"
        @click="complateActivity()"
      >
        活動完了
      </button>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

import TicketDetailCard from "~/components/pages/TicketDetailCard";
import TheChatView from "~/components/pages/TheChatView";

export default {
  components: {
    TicketDetailCard,
    TheChatView,
  },

  data() {
    return {
      uid: "",
      ticketId: this.$route.params.id,
    };
  },

  created() {
    this.$store.dispatch("ticket/init");
    this.$store.dispatch("approval/showChats", { docId: this.ticketId });
    this.$store.dispatch("user/userInit");

    auth.onAuthStateChanged((user) => (this.uid = user.uid));
  },

  computed: {
    ticketDetail() {
      return this.$store.state.ticket.tickets.filter(
        (el) => el.id === this.ticketId && el.flag === 0
      );
    },

    chats() {
      return this.$store.state.approval.chats;
    },

    users() {
      return this.$store.state.user.users.filter(
        (el) => el.uid === this.userId
      );
    },
  },

  methods: {
    //approvalsコレクションにチケットIDと申し込みユーザーIDを保存する。
    makeApprovalData(){
      this.$store.dispatch("approval/add", {
        ticketId: this.ticketId,
        participant: this.uid
      });
    },

    //申し込みをしたチケットの詳細ページに遷移する。
    gotoApprovalPage(){
      this.$router.push("/approvals/" + this.ticketId);
    },

    //申し込みデータのfirestoreへの保存と詳細ページ遷移を実行。
    applyTicket(){
      this.makeApprovalData();
      this.gotoApprovalPage();
    },

    complateActivity(){
      this.$store.dispatch("approval/complateActivity", { docId: this.ticketId });
    }
  }
};
</script>