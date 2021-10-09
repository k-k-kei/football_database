<template>
  <div>
    <!-- 検索エリア -->
    <div>
      <div
        class="
          md:absolute
          w-full
          md:w-1/3
          md:m-10
          md:p-5
          rounded-lg
        "
      >
        <!-- トップビュー -->
        <div class="hidden md:block inset-12 text-xl md:text-4xl">
          <span class="text-white font-bold">サッカー/フットサルをもっと身近に。</span><br />
          <span class="text-sm md:text-sm">
              Whistleはアマチュアサッカー/フットサルチームを登録・検索できるプラットフォームです。
              週末の練習試合の相手を、ともに高めあえる地元の仲間を探しにいきましょう。
          </span>
        </div>
      </div>
    </div>

    <!-- トップビューを表示 -->
    <div
      class="
        bg-top-image bg-cover bg-center
        h-screen/3
        md:h-screen/1.25
        md:w-full
      "
    >
      <div class="md:hidden block inset-12 text-xl p-6">
        <span class="text-white font-bold">サッカー/フットサルをもっと身近に。</span><br />
        <span class="text-sm text-white">
          Whistleはアマチュアサッカー/フットサルチームを登録・検索できるプラットフォームです。
          週末の練習試合の相手を、ともに高めあえる地元の仲間を探しにいきましょう。
        </span>
      </div>
    </div>

    <!-- メインエリア -->
    <div class="relative backdrop-opacity-50">
      <div class="md:w-3/4 mx-auto">
        <!-- カテゴリー別表示 -->
        <LayoutTitleHeader :title="'登録済みチーム一覧'" />

        <!-- チーム一覧表示 -->
        <div class="md:flex md:flex-wrap">
          <TeamShowCard :teams="teams" :userInfo="userInfo" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

export default {
  layout: "search",
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
