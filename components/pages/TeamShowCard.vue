<template>
  <div class="md:flex md:flex-wrap">
    <div
      v-for="team in teams"
      :key="team.id"
      class="h-44 m-2 mx-auto overflow-hidden bg-white shadow md:h-56 md:w-1/2"
    >
      <NuxtLink :to="link + team.id">
      <div class="flex items-center px-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 class="text-base font-bold text-gray-800 p-2 overflow-hidden">
          {{ team.name }}
        </h1>
      </div>
        <div class="flex">
          <div class="w-1/2">
            <img :src="team.image" :alt="team.image" class="h-full w-full" />
          </div>

          <div class="w-1/2 px-4 md:p-4">
            <div class="mt-1">
              <div class="text-sm font-bold">競技カテゴリー</div>
              <p class="text-xs">{{ team.category }}</p>
            </div>
            <div class="mt-1">
              <div class="text-sm font-bold">チームレベル</div>
              <p class="text-xs">{{ team.level }}</p>
            </div>
            <div class="my-1">
              <div class="text-sm font-bold">エリア</div>
              <p class="text-xs">{{ team.area1 }} {{ team.area2 }} {{ team.area3 }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teams: Array,
    userInfo: Object,
    link: String
  }
}
</script>