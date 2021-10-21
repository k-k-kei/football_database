<template>
  <div>
    <div
      v-for="teamInfo in teamDetailed"
      :key="teamInfo.id"
      class="  
        mx-auto
        overflow-hidden
        bg-white
        rounded-lg
        mt-3
      "
    >
      <!-- チームプロフィール画像 -->
      <img
        class="object-cover object-center w-full h-56"
        :src="teamInfo.image"
        alt="avatar"
      />

      <!-- チーム名 -->
      <div class="px-6 py-4">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
          {{ teamInfo.name }}
        </h1>

        <!-- 競技カテゴリー -->
        <div class="text-layout">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h1 class="px-2 text-sm">{{ teamInfo.category }}</h1>
        </div>

        <!-- チームレベル -->
        <div class="text-layout">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg> 
          <h1 class="px-2 text-sm">{{ teamInfo.level }}</h1>
        </div>

        <!-- チームのモチベーション -->
        <div class="text-layout">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <h1 class="px-2 text-sm">{{ teamInfo.motibation }}</h1>
        </div>

        <!-- 都道府県 / 市町村区① / 市町村区②  -->
        <div class="text-layout">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h1 class="px-2 text-sm">{{ teamInfo.area1 }} / {{ teamInfo.area2 }} / {{ teamInfo.area3 }}</h1>
        </div>

        <!-- チーム自己紹介 -->
        <div class="mt-6">
          <h1>【チーム自己紹介】</h1>
          <p class="px-2 text-sm">{{ teamInfo.selfIntroduction }}</p>
        </div>
      </div>
    </div>
    <!-- チーム自己紹介ここまで -->
  </div>
</template>

<script>
export default {
  props: {
    teamDetailed: Array,
  },
};
</script>

<style lang="postcss" scoped>
.text-layout {
  @apply flex items-center mt-4 text-gray-700;
}
</style>
