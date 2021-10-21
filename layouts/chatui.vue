<template>
  <div class="md:flex md:mx-96">
    <div
      class="fixed w-screen text-gray-700 font-sans text-base md:text-lg md:w-2/5"
    >
      <div class="bg-white shadow">
        <div class="text-center flex justify-between mx-3 md:mx-8 py-2">
          <div class="p-2">
            <button @click="back">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <Nuxt />
        <BaseFooter />
      </div>
    </div>
  </div>
</template>

<script>
import BaseFooter from "~/components/layouts/BaseFooter"

export default {
  components: {
    BaseFooter
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
