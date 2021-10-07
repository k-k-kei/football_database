<template>
  <div>
    <div class="bg-white shadow">
      <div class="text-center flex justify-between mx-3 md:mx-8 py-2">
        <div class="p-2"><a href="/">Football DB</a></div>
        <ul class="flex justify-between text-xs md:text-sm">

          <!-- マイページアイコン -->
          <div class="relative inline-block text-left mt-2">
            <div>
              <button
                @click="useMenu"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  class="-mr-1 ml-2 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div v-if="myPageMenu">
              <div
                class="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <nuxt-link to="/myPage"
                    ><button
                      @click="useMenu"
                      class="text-gray-700 block px-4 py-2 text-sm"
                    >
                      マイページ
                    </button></nuxt-link
                  >
                  <!-- ログアウト後にキャッシュを残さないため、
                  nuxt-linkではなくaタグにしている -->
                  <a href="/"
                    ><button
                      @click="logout"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      ログアウト
                    </button></a
                  >
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";

export default {
  data() {
    return {
      myPageMenu: false,
    };
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        console.log("logoutしました");
      });
    },
    useMenu() {
      this.myPageMenu === false
        ? (this.myPageMenu = true)
        : (this.myPageMenu = false);
    },
  },
};
</script>
