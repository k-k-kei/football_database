<template>
  <div>
    <div class="bg-gray-100 shadow m-2 p-2 flex rounded-lg">
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

    <div class="flex m-1">
      <button
        @click="openModal"
        class="bg-yellow-500 text-white text-sm md:text-2xl m-1 p-1 rounded-lg"
      >
        <p>近くのチーム</p>
      </button>
      <button
        @click="openModal"
        class="bg-blue-500 text-white text-sm md:text-2xl m-1 p-1 rounded-lg"
      >
        <p>レベルの近いチーム</p>
      </button>
    </div>

    <div>
      <div class="overlay" v-show="showContent">
        <div class="content" @click="stopEvent">
          <!-- モーダルウィンドウのコンテンツ -->
                <div class="bg-white shadow">
                    <div class="text-center align-middle flex justify-between mx-5 md:mx-8 py-2">
                        <!-- 検索ヘッダー -->
                        <div class="w-full">
                        <h1 class="text-center p-1">検索</h1>
                        </div>
                        <!-- クローズボタン -->
                        <div>
                          <button @click="closeModal">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          </button>
                        </div>
                    </div>
                </div>
                <!-- セレクトボックス -->
            <div class="flex mt-5">
              <div class="w-11/12 mx-auto">
                <h2 class="font-bold">レベル別で探す</h2>
                  <select 
                    v-model="selectedItem"
                    class=" bg-gray-200 w-full my-5 p-3 rounded-lg">
                      <option disabled>競技レベルを選択</option>
                      <option>競技志向（ハイレベル）</option>
                      <option>競技志向（シリアス）</option>
                      <option>競技志向（ジェネラル）</option>
                      <option>エンジョイ（シリアス）</option>
                      <option>エンジョイ（ジェネラル）</option>
                      <option>エンジョイ（ファン）</option>
                  </select>
              <nuxt-link to="/search">
              <button 
                class="w-full bg-gray-400 text-white p-3 rounded-md"
                @click="selected"
                >
                探す
                </button>
              </nuxt-link>
            </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Portal, PortalTarget } from "portal-vue";

export default {
  components: {
    Portal,
    PortalTarget
  },
  data() {
    return {
      showContent: false,
      selectedItem: "",
    };
  },
  methods: {
    ...mapMutations(["selectName"]),

    //検索フォームに入力された値をstoreに送る関数。
    sorted(e) {
      this.selectName(e.target.value);
    },

    //セレクトフォームで選択された値をstoreに送る関数。
    //その後、モーダルを閉じる関数を呼び出している。
    selected(){
      this.selectName(this.selectedItem);
      this.closeModal();
    },

    //モーダルを開く
    openModal() {
      this.showContent = true;
    },

    //モーダルを閉じる
    closeModal() {
      this.showContent = false;
    },

    //モーダル上のコンテンツをクリックしても、
    //closeModalが発火しないようにしている。
    stopEvent() {
      event.stopPropagation();
    }
  }
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
