<template>
  <div class="bg-gray-200 md:w-1/2 md:mx-5">
    <TicketDetailCard :ticketDetail="ticketDetail" />
    <BaseTitleHeader :title="'コメント欄'" />
    <TheChatView :chats="chats" :ticketId="ticketId" :collectionName="'ticket'" />
    <div class="my-5">
      <button
        @click="applyTicket()"
        class="w-11/12 bg-yellow-400 text-white m-3 p-3 rounded-lg"
      >
        申し込み
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

      ticketInfo: {
        title: "",
        datetime: "",
        level: "",
        place: "",
        time: "",
        comment: ""
      }
    };
  },

  created() {
    this.$store.dispatch("ticket/init");
    this.$store.dispatch("ticket/showChats", { docId: this.ticketId });
    this.$store.dispatch("user/userInit");

    auth.onAuthStateChanged((user) => (this.uid = user.uid));

  },

  computed: {
    ticketDetail() {
      const ticket = this.$store.state.ticket.tickets
      .filter((el) => el.id === this.ticketId && el.flag === 0);

    ticket.forEach((el) => {
      this.ticketInfo.title = el.title;
      this.ticketInfo.datetime = el.datetime;
      this.ticketInfo.level = el.level;
      this.ticketInfo.place = el.place;
      this.ticketInfo.time = el.time;
      this.ticketInfo.comment = el.comment;
    })

      return ticket;
    },

    chats() {
      return this.$store.state.ticket.chats;
    },

    users() {
      return this.$store.state.user.users.filter(
        (el) => el.uid === this.userId
      );
    },
  },

  methods: {
    //approvalsコレクションにチケットIDと申し込みユーザーIDを保存する。
    updateTicketData(){
      this.$store.dispatch("ticket/update", { docId: this.ticketId });
    },

    //approvalsコレクションにチケットIDと申し込みユーザーIDを保存する。
    makeApprovalData(){
      this.$store.dispatch("approval/add", {
        uid: this.uid,
        title: this.ticketInfo.title,
        datetime: this.ticketInfo.datetime,
        level: this.ticketInfo.level,
        place: this.ticketInfo.place,
        time: this.ticketInfo.time,
        comment: this.ticketInfo.comment,
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
      this.updateTicketData();
      this.gotoApprovalPage();
    }
  }
};
</script>
