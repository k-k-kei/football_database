<template>
  <div>
    <!-- フリーキーワード -->
    <div class="md:w-3/4 md:mx-auto">
      
      <!-- 検索入力フォーム -->
      <BaseSearchBox @search="getSearchWords" :placeholder="'地域・チーム名などで検索！'" :link="'/search'" />

      <div class="flex">
        <!-- 検索項目① -->
        <button
          class="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded w-1/2 m-2 p-2 text-gray-600 text-center"
          @click="openModalArea"
        >
          <p>場所で探す</p>
        </button>

        <!-- 検索項目② -->
        <button
          class="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded w-1/2 m-2 p-2 text-gray-600 text-center"
          @click="openModalLevel"
        >
          <p>多様な条件で探す</p>
        </button>
      </div>

      <div class="flex flex-wrap m-2">
        
        <!-- 
          
          選択したレベルタグ一覧を表示
          
           -->
        <div
          v-for="selectedItem in selectedItemLevel"
          :key="selectedItem.id"
          @click="deleteLevelTag(selectedItem.id)"
          class="flex bg-blue-200 text-blue-900 m-1 p-1 rounded-lg"
        >
          <p>{{ selectedItem }}</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
          </div>
        </div>
        
        <!-- 
          
          選択したエリアタグ一覧を表示
          
           -->
        <div
          v-for="selectedItem in selectedItemArea"
          :key="selectedItem.id"
          @click="deleteAreaTag(selectedItem.id)"
          class="flex bg-yellow-200 text-yellow-900 m-1 p-1 rounded-lg"
        >
          <p>{{ selectedItem }}</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
          </div>
        </div>
      </div>
    </div>

    <!-- 
      
      競技・場所モーダル
      
       -->
    <div>
      <transition>
        <div class="overlay overflow-scroll md:w-3/4 md:mx-auto" v-show="showContentArea">
          <div class="content" @click="stopEvent">
            <!-- モーダルウィンドウのコンテンツ -->
            <div class="bg-white">
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
                  <h1 class="text-center p-1">場所で探す</h1>
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

                  <!-- 都道府県 -->
                  <BaseTitleHeader :title="'都道府県'" />
                  <div class="block">
                    <div class="mt-2">
                      <div
                        v-for="area in teamAreas"
                        :key="area.id"
                        class="flex flex-wrap"
                      >
                        <label class="w-1/2 inline-flex items-center mb-3">
                          <input
                            type="checkbox"
                            class="checkboxStyle form-checkbox"
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
                      class="w-full bg-blue-400 text-white my-8 p-3 rounded-md"
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
      </transition>
    </div>

    <!-- 
      
      多様な条件モーダル
      
       -->
    <div>
      <transition>
      <div class="overlay overflow-scroll md:w-3/4 md:mx-auto" v-show="showContentLevel">
        <div class="content" @click="stopEvent">
          <!-- モーダルウィンドウのコンテンツ -->
          <div class="bg-white">
            <div
              class="
                text-center
                align-middle
                flex
                justify-between
                mx-5
                md:mx-8
                py-5
              "
            >
              <!-- 検索ヘッダー -->
              <div class="w-full">
                <h1 class="text-center p-1">多様な条件で検索</h1>
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
            <div>
              <div class="h-5/6 overflow-y-auto w-11/12 mx-auto">

                  <!-- 競技カテゴリー -->
                <BaseTitleHeader :title="'競技カテゴリー'" />
                  <div class="block">
                    <div class="mt-2">
                      <div
                        v-for="category in teamCategory"
                        :key="category.id"
                        class="flex flex-wrap"
                      >
                        <label class="w-1/2 inline-flex items-center mb-3">
                          <input
                            type="checkbox"
                            class="checkboxStyle form-checkbox"
                            :value="category"
                            v-model="selectedItemArea"
                          />
                          <span class="ml-2">{{ category }}</span>
                        </label>
                      </div>
                    </div>
                  </div>


                <!-- チームレベル -->
                <BaseTitleHeader :title="'競技レベル'" />
                <div class="block">
                  <div v-for="level in teamLevels" :key="level.id">
                    <label class="w-full inline-flex items-center mb-3">
                      <input
                        type="checkbox"
                        class="checkboxStyle form-checkbox"
                        :value="level"
                        v-model="selectedItemLevel"
                      />
                      <span class="ml-2">{{ level }}</span>
                    </label>
                  </div>
                </div>

                <!-- モチベーション -->
                <BaseTitleHeader :title="'モチベーション'" />
                <div class="block">
                  <div
                    v-for="motibation in teamMotibation"
                    :key="motibation.id"
                  >
                    <label class="w-full inline-flex items-center mb-3">
                      <input
                        type="checkbox"
                        class="checkboxStyle form-checkbox"
                        :value="motibation"
                        v-model="selectedItemLevel"
                      />
                      <span class="ml-2">{{ motibation }}</span>
                    </label>
                  </div>
                </div>

                <nuxt-link to="/search">
                  <button
                    class="w-full bg-blue-400 text-white my-8 p-3 rounded-md"
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
    </transition>
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
  created: function() {
    this.$store.dispatch("init");
    auth.onAuthStateChanged((user) => (this.user_id = user.uid));
  },
  computed: {
    teamAreas() {
      const areas = this.$store.state.teams
        .filter((el) => el.user_id != this.user_id)
        .map((data) => data.area1);
      return new Set(areas);
    },

    teamLevels() {
      const levels = this.$store.state.teams
        .filter((el) => el.user_id != this.user_id)
        .map((data) => data.level);
      return new Set(levels);
    },

    teamCategory() {
      const category = this.$store.state.teams
        .filter((el) => el.user_id != this.user_id)
        .map((data) => data.category);
      return new Set(category);
    },

    teamMotibation() {
      const motibation = this.$store.state.teams
        .filter((el) => el.user_id != this.user_id)
        .map((data) => data.motibation);
      return new Set(motibation);
    },
  },
  methods: {
    ...mapMutations(["selectName", "selectLevel", "selectArea"]),

    //検索フォームに入力された値をstoreに送る関数。
    getSearchWords(value) {
      this.selectName(value);
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

    deleteLevelTag(id) {
      this.selectedItemLevel.splice(id, 1);
      this.selectedLevel();
    },

    deleteAreaTag(id) {
      this.selectedItemArea.splice(id, 1);
      this.selectedArea();
    },
  },
};
</script>

<style lang="postcss" scoped>
.checkboxStyle {
  @apply h-7 w-7 rounded-lg;
}

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
