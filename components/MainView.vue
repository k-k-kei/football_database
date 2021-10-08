<template>
  <div>
    <div v-if="checkContents()">

    <!-- 検索されたアイテムを表示 -->
    <div v-for="team in filterdTeams(getName)" :key="team.id" class="md:w-3/4 md:mx-auto">
      <!-- 自分の作成したチームは非表示にする。 -->
      <div v-if="team.user_id != userInfo.user_id">

        <div
          class="w-11/12 m-2 mx-auto overflow-hidden bg-white rounded-lg shadow"
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
