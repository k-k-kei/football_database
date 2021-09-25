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
        <div class="hidden md:block inset-12 text-2xl md:text-4xl">
          <span>もっと</span><br />
          <span class="bg-black text-white">わくわくする日常を</span><br />
          <span class="text-xs md:text-sm">we need football more.</span>
        </div>

        <!-- 検索ボックス -->
        <SideBar />
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
      <div class="md:hidden block inset-12 text-2xl p-10">
        <span class="text-white">もっと</span><br />
        <span class="bg-black text-white">わくわくする日常を</span><br />
        <span class="text-xs text-white">we need football more.</span>
      </div>
    </div>

    <!-- メインエリア -->
    <div class="relative backdrop-opacity-50">
      <div class="md:flex md:w-11/12 mx-auto"></div>
      <div class="md:w-4/5 mx-auto">
        <!-- カテゴリー別表示 -->
        <h1 class="text-xl text-white bg-black my-2 px-3 py-4">
          活動場所の近いチーム
        </h1>
        <div
          v-for="team in filterArea"
          :key="team.id"
          class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg shadow-lg"
        >
          <NuxtLink :to="'/teams/' + team.id">
            <h1 class="text-base font-bold text-gray-800 p-2">
              {{ team.name }}
            </h1>
            <div class="flex">
              <div class="w-1/2">
                <img :src="team.image" :alt="team.image" />
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
        <!-- ここまでカテゴリー別表示 -->

        <!-- カテゴリー別表示 -->
        <h1 class="text-xl text-white bg-black my-2 px-3 py-4">
          レベルの近いチーム
        </h1>
        <div
          v-for="team in filterLevel"
          :key="team.id"
          class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg shadow-lg"
        >
          <NuxtLink :to="'/teams/' + team.id">
            <h1 class="text-base font-bold text-gray-800 p-2">
              {{ team.name }}
            </h1>
            <div class="flex">
              <div class="w-1/2">
                <img :src="team.image" :alt="team.image" />
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
    filterArea() {
      return this.$store.state.teams.filter(el => {
        return el.user_id != this.userInfo.user_id && el.area === "渋谷区";
      });
    },

    // カテゴリー別表示
    filterLevel() {
      return this.$store.state.teams.filter(el => {
        return (
          el.user_id != this.userInfo.user_id &&
          el.level.indexOf("ハイレベル") > -1
        );
      });
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
