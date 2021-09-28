<template>
  <div>
    <!-- フリーキーワード -->
    <div class="bg-gray-100 m-2 p-2 flex rounded-lg">
      <span class="w-auto flex justify-end items-center text-gray-500 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        class="bg-gray-100 w-full rounded p-2"
        @input="sorted"
        type="text"
        placeholder="試合相手を見つけよう！"
      />
      <nuxt-link
        to="/search"
        class="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4"
      >
        <button>
          <p class="font-semibold text-xs">Search</p>
        </button>
      </nuxt-link>
    </div>

    <div class="flex">
      <!-- 検索項目① -->
      <div
        class="bg-gray-100 rounded w-1/2 m-2 p-2 text-center"
        @click="openModalArea"
      >
        <p>活動場所で探す</p>
      </div>

      <!-- 検索項目② -->
      <div
        class="bg-gray-100 rounded w-1/2 m-2 p-2 text-center"
        @click="openModalLevel"
      >
        <p>チームレベルで探す</p>
      </div>
    </div>
    <div v-for="selectedItem in selectedItemLevel" :key="selectedItem.id">
      <span>{{ selectedItem }}</span>
    </div>

    <!-- 
      
      エリアモーダル
      
       -->
    <div>
      <div class="overlay" v-show="showContentArea">
        <div class="content" @click="stopEvent">
          <!-- モーダルウィンドウのコンテンツ -->
          <div class="bg-white shadow">
            <div
              class="
                text-center
                align-middle
                flex
                justify-between
                mx-5
                md:mx-8
                py-2
              "
            >
              <!-- 検索ヘッダー -->
              <div class="w-full">
                <h1 class="text-center p-1">活動場所で探す</h1>
              </div>
              <!-- クローズボタン -->
              <div>
                <button @click="closeModalArea">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <!-- チェックボックス検索エリア-->
            <div class="flex mt-5">
              <div class="w-11/12 mx-auto">
                <div class="block">
                  <div class="mt-2">
                    <div v-for="area in teamAreas" :key="area.id" class="flex flex-wrap">
                      <label class="w-1/2 inline-flex items-center mb-3">
                        <input
                          type="checkbox"
                          class="form-checkbox h-7 w-7 rounded-lg"
                          :value="area"
                          v-model="selectedItemArea"
                        />
                        <span class="ml-2">{{ area }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <nuxt-link to="/search">
                  <button
                    class="w-full bg-gray-400 text-white mt-5 p-3 rounded-md"
                    @click="selectedArea"
                  >
                    探す
                  </button>
                </nuxt-link>
              </div>
            </div>
            <!-- チェックボックス検索エリアここまで -->
          </div>
        </div>
      </div>
    </div>

    <!-- 
      
      レベルモーダル
      
       -->
    <div>
      <div class="overlay" v-show="showContentLevel">
        <div class="content" @click="stopEvent">
          <!-- モーダルウィンドウのコンテンツ -->
          <div class="bg-white shadow">
            <div
              class="
                text-center
                align-middle
                flex
                justify-between
                mx-5
                md:mx-8
                py-2
              "
            >
              <!-- 検索ヘッダー -->
              <div class="w-full">
                <h1 class="text-center p-1">チームレベルで検索</h1>
              </div>
              <!-- クローズボタン -->
              <div>
                <button @click="closeModalLevel">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <!-- チェックボックス検索エリア-->
            <div class="flex mt-5">
             <div class="w-11/12 mx-auto">
                <div class="block">
                  <div class="mt-2">
                    <div v-for="level in teamLevels" :key="level.id" class="flex flex-wrap">
                      <label class="w-1/2 inline-flex items-center mb-3">
                        <input
                          type="checkbox"
                          class="form-checkbox h-7 w-7 rounded-lg"
                          :value="level"
                          v-model="selectedItemLevel"
                        />
                        <span class="ml-2 text-xs">{{ level }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <nuxt-link to="/search">
                  <button
                    class="w-full bg-gray-400 text-white mt-5 p-3 rounded-md"
                    @click="selectedLevel"
                  >
                    探す
                  </button>
                </nuxt-link>
              </div>
            </div>
            <!-- チェックボックス検索エリアここまで -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Portal, PortalTarget } from "portal-vue";

import { auth } from "~/plugins/firebase";

export default {
  components: {
    Portal,
    PortalTarget,
  },
  data() {
    return {
      showContentArea: false,
      showContentLevel: false,

      selectedItemArea: [],
      selectedItemLevel: [],

      searchWords: "",

      //ログイン中のユーザーID
      user_id: "",
    };
  },
  created: function () {
    this.$store.dispatch("init");
    auth.onAuthStateChanged((user) => (this.user_id = user.uid));
  },
  computed: {
    teamAreas() {
      const areas = this.$store.state.teams
        .filter((el) => el.user_id != this.user_id)
        .map((data) => data.area);
      return new Set(areas);
    },
    teamLevels() {
      const levels = this.$store.state.teams
        .filter((el) => el.user_id != this.user_id)
        .map((data) => data.level);
      return new Set(levels);
    },
  },
  methods: {
    ...mapMutations(["selectName"]),
    ...mapMutations(["selectLevel"]),
    ...mapMutations(["selectArea"]),

    //検索フォームに入力された値をstoreに送る関数。
    sorted(e) {
      this.selectName(e.target.value);
    },

    //セレクトフォームで選択された値をstoreに送る関数。
    //その後、モーダルを閉じる関数を呼び出している。
    selectedArea() {
      const items = this.selectedItemArea.join("　");
      console.log(items);

      this.selectArea(items);
      this.closeModalArea();
    },

    selectedLevel() {
      const items = this.selectedItemLevel.join("　");
      console.log(items);

      this.selectLevel(items);
      this.closeModalLevel();
    },

    //エリアモーダルを開く
    openModalArea() {
      this.showContentArea = true;
    },

    //エリアモーダルを閉じる
    closeModalArea() {
      this.showContentArea = false;
    },

    //レベルモーダルを開く
    openModalLevel() {
      this.showContentLevel = true;
    },

    //レベルモーダルを閉じる
    closeModalLevel() {
      this.showContentLevel = false;
    },

    //モーダル上のコンテンツをクリックしても、
    //closeModalが発火しないようにしている。
    stopEvent() {
      event.stopPropagation();
    },
  },
};
</script>

<style scoped>
.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
}
.content {
  background-color: white;
  width: 100%;
  height: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
