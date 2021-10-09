<template>
  <div>
    <div v-if="checkContents()">

    <!-- 検索されたアイテムを表示 -->
    <TeamShowCard :teams="filterdTeams(getName)" :userInfo="userInfo"/>
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

export default {
  data() {
    return {
      userInfo: {
        user_id: ""
      },
    };
  },
  created: function() {
    this.$store.dispatch("init");
    auth.onAuthStateChanged(user => (this.userInfo.user_id = user.uid));
  },
  computed: {
    //gettersを呼び出し。
    filterdTeams() {
      return this.$store.getters.filterdTeams;
    },

    //storeから検索フォームで入力された値を取得。
    getName() {
      return this.$store.state.teamInfo;
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
    checkContents(){
      //検索コンテンツが0の時にテキスト表示を切り替える
      return this.filterdTeams(this.getName).length != 0 ? true : false;
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
