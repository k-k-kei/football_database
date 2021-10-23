<template>
    <div class="bg-gray-100 m-2 p-2 flex rounded-lg">

        <!-- 虫眼鏡アイコン -->
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
        
        <!-- 検索ワード入力欄 -->
        <input
          class="bg-gray-100 w-full rounded p-2"
          @change="sorted"
          type="text"
          :placeholder="placeholder"
        />

        <!-- ボタンクリック時の遷移先を親コンポーネントで指定 -->
        <nuxt-link
          :to="link"
          class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:bg-red-300 rounded text-gray-600 p-2 pl-4 pr-4"
        >
          <button class="font-semibold text-xs">Search</button>
        </nuxt-link>
      </div>
</template>

<script>
export default {
    props: {
        placeholder: String,
        link: String
    },

    methods: {
        sorted($event){
            this.$emit("search", $event.target.value)
        }
    }
}
</script>