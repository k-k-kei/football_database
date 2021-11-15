<template>
  <div>
    <div v-if="checkContents()">

    <!-- 検索されたアイテムを表示 -->
    <TicketShowCard :tickets="tickets(filterdTickets(getName))" :link="/tickets/" />
    </div>

    <!-- 検索結果がなかった場合に表示 -->
    <div v-else>
      <div class="text-center p-5">
        <div>ヒットするチームがありませんでした・・・！</div>
        <div>お望みのチームが現れる日を待ちましょう！</div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

import TicketShowCard from "~/components/pages/TicketShowCard"

export default {
  components: {
    TicketShowCard
  },
  data() {
    return {
      userInfo: {
        user_id: ""
      },
    };
  },
  created: function() {
    this.$store.dispatch("ticket/init");
    auth.onAuthStateChanged(user => (this.userInfo.user_id = user.uid));
  },
  computed: {
    //gettersを呼び出し。
    filterdTickets() {
      return this.$store.getters["ticket/filterdTickets"];
    },

    //storeから検索フォームで入力された値を取得。
    getName() {
      return this.$store.state.ticketInfo;
    },
  },
  mounted() {
    //画面上部にローディングバーを表示
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 300);
    });
  },

  methods: {
    tickets(ticket){
      return ticket;
      //自分のuidが含まれるチケットを非表示にする
      //すでに他の人が申込済みでflag1の場合も非表示にする
      //※現在はテスト中なので一旦コメントアウトしている。
      //本番環境では有効にすること。
      // return ticket.filter(el => el.uid != this.userInfo.user_id || el.flag != 0);
    },

    checkContents(){
      //検索コンテンツが0の時にテキスト表示を切り替える
      return this.filterdTickets(this.getName).length != 0 ? true : false;
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 1px) {
  .card-width {
    width: 45%;
  }
}

@media screen and (min-width: 768px) {
  .card-width {
    width: 45%;
  }
}

@media screen and (min-width: 1070px) {
  .card-width {
    width: 31%;
  }
}
</style>
