<template>
  <div>
    <!-- モバイルサイズの時のみ
    ヘッダー下に検索コンポーネントを設置 -->
    <div class="md:hidden">
      <SideBar />
    </div>
    
    <!-- トップビューを表示 -->
    <div class="bg-top-image bg-cover bg-center h-screen/3 md:h-screen/1.25">
      <div class="text-xl p-6 md:mx-36 md:pt-20">
        <span class="text-white font-bold md:block md:text-6xl bg-gray-400 bg-opacity-40">サッカー/フットサルをもっと身近に。</span><br />
        <span class="text-sm text-white md:text-4xl md:font-bold md:leading-relaxed bg-gray-400 bg-opacity-40">
          Whistleはアマチュアサッカー/フットサルチームを登録・検索できるプラットフォームです。
          週末の練習試合の相手を、ともに高めあえる地元の仲間を探しにいきましょう。
        </span>
      </div>
      <!-- デスクトップサイズの時のみ
      検索コンポーネントをトップビュー上に表示 -->
      <div class="hidden md:block md:w-1/2 md:mx-auto">
        <SideBar />
      </div>
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

import SideBar from "~/components/pages/SideBar"
import TeamShowCard from "~/components/pages/TeamShowCard"

export default {
  components: {
    SideBar,
    TeamShowCard
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