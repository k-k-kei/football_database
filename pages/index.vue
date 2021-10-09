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
          <span>サッカー/フットサルをもっと身近に。</span><br />
          <span class="text-xs md:text-sm">
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
      <div class="md:hidden block inset-12 text-xl p-8">
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
        <div class="md:flex md:flex-wrap">
        <div
          v-for="team in teams"
          :key="team.id"
          class="h-44 md:h-56 m-2 mx-auto overflow-hidden bg-white rounded-lg shadow md:w-1/2"
        >
          <NuxtLink :to="'/teams/' + team.id">
            <h1 class="text-base font-bold text-gray-800 p-2 overflow-hidden">
              {{ team.name }}
            </h1>
            <div class="flex">
              <div class="w-1/2">
                <img :src="team.image" :alt="team.image" class="h-full w-full"/>
              </div>

              <div class="w-1/2 px-4 md:p-4">
                <div class="mt-2">
                  <div class="font-bold">チームレベル</div>
                  <p class="text-xs">{{ team.level }}</p>
                </div>
                <div class="my-4">
                  <div class="font-bold">エリア</div>
                  <p class="text-xs">{{ team.area }}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        </div>
        <!-- ここまでカテゴリー別表示 -->
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
      return this.$store.state.teams;  
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
