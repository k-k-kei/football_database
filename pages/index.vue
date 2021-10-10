<template>
  <div>
    <!-- 検索エリア -->
    <!-- <div> -->
      <!-- <div
        class="
          md:absolute
          w-full
          md:w-1/3
          md:m-10
          md:p-5
          rounded-lg
        "
      > -->
        <!-- トップビュー -->
        <!-- <div class="hidden md:block inset-12 text-xl md:text-4xl">
          <span class="text-white font-bold">サッカー/フットサルをもっと身近に。</span><br />
          <span class="text-sm md:text-sm">
              Whistleはアマチュアサッカー/フットサルチームを登録・検索できるプラットフォームです。
              週末の練習試合の相手を、ともに高めあえる地元の仲間を探しにいきましょう。
          </span>
        </div>
      </div>
    </div> -->

    <!-- モバイルサイズの時のみヘッダー下に検索コンポーネントを設置 -->
    <div class="md:hidden">
      <SideBar />
    </div>
    
    <!-- トップビューを表示 -->
    <div
      class="
        bg-top-image bg-cover bg-center
        h-screen/3
        md:h-screen/1.25
      "
    >

      <div class="text-xl p-6 md:mx-36 md:pt-20">
        <span class="text-white font-bold md:block md:text-6xl bg-gray-400 bg-opacity-40">サッカー/フットサルをもっと身近に。</span><br />
        <span class="text-sm text-white md:text-4xl md:font-bold md:leading-relaxed bg-gray-400 bg-opacity-40">
          Whistleはアマチュアサッカー/フットサルチームを登録・検索できるプラットフォームです。
          週末の練習試合の相手を、ともに高めあえる地元の仲間を探しにいきましょう。
        </span>
      </div>

      <!-- デスクトップサイズの時のみ検索コンポーネントをトップビュー上に表示 -->
      <div class="hidden md:block md:w-1/2 md:mx-auto">
        <SideBar />
      </div>
    </div>

    <!-- メインエリア -->
    <div class="relative backdrop-opacity-50">
      <div class="md:w-3/4 mx-auto">
        <!-- カテゴリー別表示 -->
        <LayoutTitleHeader :title="'登録済みチーム一覧'" />
        <!-- チーム一覧表示 -->
        <TeamShowCard :teams="teams" :userInfo="userInfo" />
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
      userInfo: {
        user_id: ""
      },

      teamImage: "",
    };
  },
  created: function() {
    this.$store.dispatch("init");
    auth.onAuthStateChanged(user => (this.userInfo.user_id = user.uid));
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
