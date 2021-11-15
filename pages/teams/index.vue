<template>
  <div>
    <!-- チケットとチームのビュー画面を切り替えるボタン -->
    <TheViewSelectButtonTwoColumn />
    <!-- モバイルサイズの時のみ
    ヘッダー下に検索コンポーネントを設置 -->
    <div class="md:hidden">
      <TheSearchTeams />
    </div>
    
    <!-- トップビューを表示 -->
      <!-- デスクトップサイズの時のみ
      検索コンポーネントをトップビュー上に表示 -->
      <div class="hidden md:block md:w-1/2 md:mx-auto">
        <TheSearchTeams />
      </div>

    <!-- メインエリア -->
    <div>
      <div class="md:w-3/4 mx-auto">
        <!-- カテゴリー別表示 -->
        <BaseTitleHeader :title="'登録済みチーム一覧'" />
        <!-- チーム一覧表示 -->
        <TeamShowCard :teams="teams" :userInfo="userInfo" :link="'/teams/'" />
      </div>
    </div>

  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

import TheSearchTeams from "~/components/pages/TheSearchTeams"
import TeamShowCard from "~/components/pages/TeamShowCard"
import TheViewSelectButtonTwoColumn from "~/components/pages/TheViewSelectButtonTwoColumn"

export default {
  components: {
    TheSearchTeams,
    TeamShowCard,
    TheViewSelectButtonTwoColumn
  },
  layout: "default",
  data() {
    return {
      userInfo: {
        user_id: ""
      },
    };
  },
  created: function() {
    this.$store.dispatch("init");
    auth.onAuthStateChanged(user => this.userInfo.user_id = user.uid);
    //storeにアクセスしてログインユーザー情報を取得する
    //※現状リロードするとstoreにログイン情報を格納するミドルウェアが動かない。
    //結果ログイン情報も空になってしまう不具合が発生している。
    // this.userInfo.user_id = this.$store.state.auth.auth;
    // console.log(this.userInfo.user_id)
  },
  computed: {
    // カテゴリー別表示
    teams() {
      return this.$store.state.teams
      .filter(el => el.user_id != this.userInfo.user_id);
    },
  },
};
</script>